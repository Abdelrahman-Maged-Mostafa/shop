// src/components/ManageOffers.js
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { useLogin } from "../context/useLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOffersLine } from "../api/option";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";
import { useOptions } from "../context/useOptions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: var(--shadow-lg);
  border-radius: 8px;
  background-color: var(--color-grey-0);
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 28px;
  color: var(--color-grey-900);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid var(--color-grey-400);
  border-radius: 4px;
  width: 100%;
  background-color: var(--color-grey-0);
  margin-right: 10px;
`;

const DeleteButton = styled(FaTrash)`
  cursor: pointer;
  color: var(--color-red-700);
  &:hover {
    color: var(--color-red-800);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  margin-top: 20px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  cursor: pointer;
  width: 145px;
  border: none;
  background-color: var(--color-brand-500);
  color: var(--color-grey-0);
  border-radius: 5px;
  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const ManageOffers = () => {
  const { offersLine } = useOptions();
  const [offers, setOffers] = useState(offersLine || [""]);
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ body, token }) => updateOffersLine(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option"] });
      toast.success("New Offers have been successfully set.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  useEffect(() => setOffers(offersLine || [""]), [offersLine]);
  const addNewOffer = () => {
    setOffers([...offers, ""]);
  };

  const saveChanges = () => {
    mutate({ body: { offersLine: offers }, token: cookies.jwt });
  };

  const handleInputChange = (index, event) => {
    const newOffers = [...offers];
    newOffers[index] = event.target.value;
    setOffers(newOffers);
  };

  const deleteOffer = (index) => {
    const newOffers = offers.filter((_, i) => i !== index);
    setOffers(newOffers);
  };

  return (
    <Container>
      <Title>Offers Line</Title>
      {offers.map((offer, index) => (
        <InputContainer key={index}>
          <Input
            type="text"
            value={offer}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Enter offer"
          />
          <DeleteButton onClick={() => deleteOffer(index)} />
        </InputContainer>
      ))}
      <ButtonContainer>
        <Button whileHover={{ scale: 1.1 }} onClick={addNewOffer}>
          Add New Offer
        </Button>
        <Button
          whileHover={{ scale: 1.1 }}
          onClick={saveChanges}
          disabled={isLoading}
        >
          {isLoading ? <SpinnerMini /> : "Save Changes"}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default ManageOffers;
