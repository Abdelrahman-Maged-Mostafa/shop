import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLogin } from "../context/useLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";
import { useOptions } from "../context/useOptions";
import { updateFooterBody } from "../api/option";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--color-grey-0);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  max-width: 400px;
  margin: auto;
`;

const InputWrapper = styled(motion.div)`
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
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

const SaveButton = styled(motion.button)`
  padding: 10px 20px;
  background-color: var(--color-brand-500);
  color: var(--color-grey-0);
  border: none;
  border-radius: 4px;
  width: 150px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const ChangeFooterBody = () => {
  const { footerInfo } = useOptions();
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState(footerInfo?.email || "");
  const [phone, setPhone] = useState(footerInfo?.phone || "");
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ body, token }) => updateFooterBody(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option"] });
      toast.success("New info have been successfully set.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSave = () => {
    // Handle save logic here
    mutate({ body: { email, phone }, token: cookies.jwt });
  };
  useEffect(() => {
    setEmail(footerInfo?.email || "");
    setPhone(footerInfo?.phone || "");
  }, [footerInfo]);

  return (
    <Container>
      <InputWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Label>Help Email :</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Label>Help Line Number :</Label>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </InputWrapper>
      <SaveButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? <SpinnerMini /> : "Save Changes"}
      </SaveButton>
    </Container>
  );
};

export default ChangeFooterBody;
