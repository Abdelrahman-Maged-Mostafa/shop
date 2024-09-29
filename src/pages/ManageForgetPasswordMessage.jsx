import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useOptions } from "../context/useOptions";
import { useLogin } from "../context/useLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateForgetMessage } from "../api/option";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

const Card = styled(motion.div)`
  background: var(--color-grey-0);
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
  margin: 20px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
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
`;
const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--color-brand-500);
  color: var(--color-grey-0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const ManageForgetPasswordMessage = () => {
  const { forgetMessage } = useOptions();
  const [option, setOptions] = useState(forgetMessage || {});
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ body, token }) => updateForgetMessage(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option"] });
      toast.success("New shop address and name have been successfully set.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOptions({
      ...option,
      [name]: value,
    });
  };
  useEffect(() => setOptions(forgetMessage || {}), [forgetMessage]);

  const handleSave = () => {
    mutate({ body: option, token: cookies.jwt });
  };

  return (
    <StyledPage>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Forget Password message</Title>
        <Input
          name="address"
          placeholder="shop address"
          value={option?.address}
          onChange={handleChange}
          type="text"
        />
        <Input
          name="shopName"
          placeholder="shop name"
          value={option?.shopName}
          type="text"
          onChange={handleChange}
        />
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Save Changes"}
        </Button>
      </Card>
    </StyledPage>
  );
};

export default ManageForgetPasswordMessage;
