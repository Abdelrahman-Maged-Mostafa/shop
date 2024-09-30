// MessagePage.js
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getAllAdminTickets, updateTicket } from "../api/tickets";
import { useLogin } from "../context/useLogin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { CiSquareInfo } from "react-icons/ci";
import PopupMessage from "../serv/account/PopUpMessage";

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
}
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

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;

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
  position: relative;
  @media (max-width: 768px) {
    height: 200px;
  }
`;
const StyledTime = styled.span`
  margin-bottom: 5px;
  color: var(--color-grey-500);
  font-size: 12px;
`;
const StyledTimeBoard = styled.span`
  color: var(--color-grey-500);
  font-size: 12px;
  display: block;
  position: absolute;
  right: 5px;
  transform: translateY(-100%);
`;
const StyledP = styled.p`
  text-align: center;
`;
const StyledInfo = styled.div`
  cursor: pointer;
  position: absolute;
  right: 50px;
  font-size: 30px;
  color: var(--color-grey-500);
  &:hover {
    color: var(--color-brand-500);
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

const ManageMessage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { login, cookies } = useLogin();
  const { id } = useParams();
  const boardRef = useRef(null);
  const lastElementRef = useRef(null);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const { data: ticketsData, isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getAllAdminTickets(cookies.jwt),
    enabled: !!cookies.jwt,
  });
  const { isLoading: isUpdated, mutate } = useMutation({
    mutationFn: ({ id, body, token }) => updateTicket(id, body, token),
    onSuccess: (val) => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const ticket = ticketsData?.data?.find((tic) => tic._id === id);
  useEffect(() => {
    if (boardRef.current && lastElementRef.current) {
      const board = boardRef.current;
      const lastElement = lastElementRef.current;
      board.scrollTop = lastElement.offsetTop;
    }
  }, [lastElementRef, ticket?.messages]);
  function handleSubmit(e) {
    e.preventDefault();
    mutate({ id, body: { message }, token: cookies.jwt });
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  if (!ticket) return <StyledP>No ticket.</StyledP>;
  if (isLoading) return <Spinner />;
  if (!login) return <StyledP>Please Login to see your tickets.</StyledP>;
  return (
    <PageContainer>
      <StyledInfo onClick={togglePopup}>
        <CiSquareInfo />
      </StyledInfo>
      <PopupMessage
        isOpen={isOpen}
        togglePopup={togglePopup}
        user={ticket?.user}
      />
      <Title>Title: {ticket?.title}</Title>
      <StyledTime>{formatDate(ticket?.createdAt)}</StyledTime>
      <Board
        ref={boardRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {ticket?.messages?.map((message, index) => (
          <div
            key={message._id}
            ref={ticket?.messages?.length === index + 1 ? lastElementRef : null}
          >
            <p style={{ marginBottom: "15px" }}>
              {message.sendEmail}: {message.message}
            </p>
            <StyledTimeBoard>{formatDate(message?.createdAt)}</StyledTimeBoard>
          </div>
        ))}
      </Board>
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

export default ManageMessage;
