import styled from "styled-components";
import StarRating from "../../ui/StarRating";
import Pagination from "../dashboard/Pagination";
import { useState } from "react";
import { HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import SpinnerMini from "../../ui/SpinnerMini";
import Button from "../../ui/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUserOrders } from "../../api/orders";
import { useLogin } from "../../context/useLogin";
import toast from "react-hot-toast";
import { getMe } from "../../api/user";
import ReviewPopup from "./ReviewPopUp";
import { deleteOneReview } from "../../api/items";
import { FaEdit } from "react-icons/fa";

const ReviewCard = styled.div`
  border: 1px solid var(--color-grey-50);
  border-radius: 10px;
  padding: 15px 15px 20px 15px;
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-lg);
  position: relative;

  .review-name {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .review-text {
    font-size: 1em;
    color: var(--color-grey-800);
    margin-bottom: 10px;
  }

  .review-date {
    position: absolute;
    font-size: 0.8em;
    color: var(--color-grey-500);
    bottom: 5px;
    right: 10px;
  }
`;
const StyledPage = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  position: relative;
`;
const StyledH = styled.h1`
  @media screen and (max-width: 480px) {
    margin-bottom: 50px;
    text-align: center;
  }
`;
const DeletedStyle = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
  color: var(--color-red-700);
  cursor: pointer;
  &:hover {
    color: var(--color-red-800);
  }
`;
const EditStyle = styled.div`
  position: absolute;
  right: 40px;
  top: 10px;
  font-size: 20px;
  color: var(--color-grey-700);
  cursor: pointer;
  &:hover {
    color: var(--color-grey-900);
  }
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function Rating({ curItem, deleted, top = "-70px", isDeleted }) {
  const reviews = curItem?.reviews?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [reviewId, setReviewId] = useState("");
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const [confirmDeleteToggle, setConfirmDeleteToggle] = useState(false);
  const numReviewInPage = 6;
  const startItem = (page - 1) * numReviewInPage;
  const endItem = page * numReviewInPage;
  const reviewsInPage = reviews?.slice(startItem, endItem);
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getAllUserOrders(cookies.jwt),
  });
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(cookies.jwt),
  });
  const ordersHistoryFilter = orders?.data?.data?.filter(
    (order) => order.status === "completedOrder"
  );
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: ({ id, token }) => deleteOneReview(id, token),
    onSuccess: () => {
      toast.success("Review successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function getFormatDate(dat) {
    const date = new Date(dat);
    return date.toLocaleString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  const myReview = reviews?.find(
    (rev) => rev.user._id === userData?.data?.doc?._id
  );
  //handle review for users
  const canReview = ordersHistoryFilter?.find((order) =>
    order.items.find((item) => item.itemId === curItem?._id)
  );

  function handleCreateReview() {
    if (!canReview)
      return toast.error(
        "You has not purchased this item or order is not completed."
      );
    if (myReview) return toast.error("You have already reviewed this item.");

    setIsReviewPopupOpen(true);
  }

  function handleDelete(id) {
    mutate({ id, token: cookies.jwt });
  }

  return (
    <>
      <ReviewPopup
        isOpen={isReviewPopupOpen}
        onClose={() => setIsReviewPopupOpen(false)}
        curItem={curItem}
        token={cookies?.jwt}
        myReview={myReview}
      />
      <StyledH>All Review ({reviews?.length})</StyledH>
      <StyledPage>
        <Pagination
          setPage={setPage}
          page={page}
          numPages={Math.ceil(reviews?.length / numReviewInPage)}
          style={{ top: top }}
        />
        {confirmDeleteToggle && (
          <ConfirmDelete
            resourceName="review"
            onConfirm={() => {
              userData?.data?.doc?.role === "admin"
                ? deleted(reviewId)
                : handleDelete(reviewId);
            }}
            close={() => setConfirmDeleteToggle(false)}
          />
        )}
        {reviewsInPage?.map((review, i) => (
          <ReviewCard key={i}>
            <div className="review-name">{review.user.name}</div>
            {(deleted || review.user._id === userData?.data?.doc?._id) && (
              <DeletedStyle
                onClick={() => {
                  setReviewId(review.id);
                  setConfirmDeleteToggle(true);
                }}
              >
                {(isDeleted || isDeleting) && reviewId === review.id ? (
                  <SpinnerMini />
                ) : (
                  <HiTrash />
                )}
              </DeletedStyle>
            )}
            {review.user._id === userData?.data?.doc?._id && (
              <EditStyle onClick={() => setIsReviewPopupOpen(true)}>
                <FaEdit />
              </EditStyle>
            )}
            <StarRating
              size={20}
              defaultRating={review.rating}
              color={"var(--color-yellow-700)"}
            />
            <div className="review-text">{review.review}</div>
            <div className="review-date">
              Posted in {getFormatDate(review.createdAt)}
            </div>
          </ReviewCard>
        ))}
      </StyledPage>
      {!isLoading && !deleted && (
        <StyledButton>
          <Button onClick={handleCreateReview}>Create review</Button>
        </StyledButton>
      )}
    </>
  );
}

export default Rating;
