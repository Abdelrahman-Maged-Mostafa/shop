import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";
import { banUser, unBanUser } from "../../api/user";

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

const PopUpBanUser = ({ isOpen, onClose, token, id, banned }) => {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const { isLoading: isUpdated, mutate } = useMutation({
    mutationFn: ({ id, body, token }) => banUser(id, body, token),
    onSuccess: () => {
      toast.success("User successfully banned.");
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      onClose();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const { isLoading, mutate: unBan } = useMutation({
    mutationFn: ({ id, token }) => unBanUser(id, token),
    onSuccess: () => {
      toast.success("User successfully Unbanned.");
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      onClose();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  async function handleBannedUser() {
    if (banned) {
      unBan({ id, token });
    } else {
      const body = { message };
      mutate({ id, body, token });
    }
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
        {banned ? (
          <p style={{ margin: "50px 10px" }}>
            Are you sure you want to unban this user?
          </p>
        ) : (
          <>
            <Heading>Write a ban message</Heading>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your ban message..."
            />
          </>
        )}
        <ButtonContainer>
          <Button variation="danger" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleBannedUser} style={{ width: "90px" }}>
            {isUpdated || isLoading ? (
              <SpinnerMini />
            ) : banned ? (
              "Yes"
            ) : (
              "Submit"
            )}
          </Button>
        </ButtonContainer>
      </Popup>
    </Overlay>
  );
};

export default PopUpBanUser;
