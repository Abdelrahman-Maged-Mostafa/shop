import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLogin } from "../context/useLogin";
import { createTicket } from "../api/tickets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const SelectTitle = styled.select`
  font-size: 24px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-400);
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Board = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  height: 300px;
  overflow-y: auto;
  border: 1px solid var(--color-grey-900);
  border-radius: 9px;
  padding: 10px;
  overflow-y: auto;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const TextArea = styled.textarea`
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid var(--color-grey-400);
  border-radius: 4px;
  background-color: var(--color-grey-0);
  width: 100%;
  max-width: 600px;
  height: 100px;
  padding: 10px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    height: 80px;
  }
`;

const NewTicket = () => {
  const { cookies } = useLogin();
  const boardRef = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const lastElementRef = useRef(null);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Payment Method Problem");
  const { isLoading: isUpdated, mutate } = useMutation({
    mutationFn: ({ body, token }) => createTicket(body, token),
    onSuccess: (val) => {
      setMessage("");
      setTitle("Payment Method Problem");
      toast.success("Ticket successfully submited.");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      navigate("/customerServies");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  useEffect(() => {
    if (boardRef.current && lastElementRef.current) {
      const board = boardRef.current;
      const lastElement = lastElementRef.current;
      board.scrollTop = lastElement.offsetTop - board.offsetTop;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ body: { title, message }, token: cookies.jwt });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <PageContainer>
      <SelectTitle value={title} onChange={(e) => setTitle(e.target.value)}>
        <option value="Payment Method Problem">Payment Method Problem</option>
        <option value="User Problem">User Problem</option>
        <option value="Order Problem">Order Problem</option>
        <option value="Other">Other</option>
      </SelectTitle>
      <Board
        ref={boardRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      ></Board>
      <form
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
        }}
        onSubmit={handleSubmit}
      >
        <TextArea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isUpdated}
        />
      </form>
    </PageContainer>
  );
};

export default NewTicket;
