import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "../../ui/Button";
import StarRatingReview from "../../ui/StarRatingReview"; // Assuming you have a StarRating component
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateOneReview, UpdateOneReview } from "../../api/items";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled(motion.div)`
  background: var(--color-grey-50);
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: var(--shadow-lg);
`;

const Heading = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid var(--color-grey-500);
  border-radius: 5px;
  resize: none;
  background-color: var(--color-grey-50);
  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReviewPopup = ({ isOpen, onClose, curItem, token, myReview }) => {
  const [review, setReview] = useState(myReview?.review || "");
  const [rating, setRating] = useState(myReview?.rating || 1);
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ body, token }) => CreateOneReview(body, token),
    onSuccess: () => {
      toast.success("Review successfully Created.");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      onClose();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  useEffect(() => {
    setReview(myReview?.review || "");
    setRating(myReview?.rating || 1);
  }, [myReview]);
  const { isLoading: isUpdating, mutate: updateRev } = useMutation({
    mutationFn: ({ id, body, token }) => UpdateOneReview(id, body, token),
    onSuccess: () => {
      toast.success("Review successfully Updated.");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      onClose();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  async function handleCreateReview() {
    const body = JSON.stringify({ review, rating, item: curItem._id });
    mutate({ body, token });
  }

  async function handleUpdateReview() {
    const body = JSON.stringify({ review, rating });
    updateRev({ id: myReview?._id, body, token });
  }

  if (!isOpen) return null;
  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Popup
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Heading>Write a Review</Heading>
        <StarRatingReview
          defaultRating={rating}
          scoreRate={setRating}
          size={24}
          color="var(--color-yellow-700)"
        />
        <Input
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
        />
        <ButtonContainer>
          <Button variation="danger" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={myReview ? handleUpdateReview : handleCreateReview}
            style={{ width: "90px" }}
          >
            {isLoading || isUpdating ? <SpinnerMini /> : "Submit"}
          </Button>
        </ButtonContainer>
      </Popup>
    </Overlay>
  );
};

export default ReviewPopup;
