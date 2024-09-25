import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAboutUs } from "../api/option";
import { useOptions } from "../context/useOptions";
import { useLogin } from "../context/useLogin";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
`;
const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid var(--color-grey-400);
  border-radius: 4px;
  width: 100%;
  background-color: var(--color-grey-0);

  &:focus {
    outline: none;
  }
`;

const Button = styled(motion.button)`
  width: 150px;
  padding: 10px 20px;
  font-size: 1em;
  margin-top: 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: var(--color-brand-500);
  color: var(--color-grey-0);
  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const ManageAboutUsInfo = () => {
  const { aboutUs } = useOptions();
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const [p, setP] = useState(aboutUs?.p || "");
  const [pp, setPp] = useState(aboutUs?.pp || "");
  const [ppp, setPpp] = useState(aboutUs?.ppp || "");
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ body, token }) => updateAboutUs(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option"] });
      toast.success("New info have been successfully set.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const handleSave = () => {
    mutate({ body: { p, pp, ppp }, token: cookies.jwt });
  };
  useEffect(() => {
    setP(aboutUs?.p || "");
    setPp(aboutUs?.pp || "");
    setPpp(aboutUs?.ppp || "");
  }, [aboutUs]);
  return (
    <Container>
      <TextArea
        value={p}
        onChange={(e) => setP(e.target.value)}
        placeholder="Paragraph 1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />
      <TextArea
        value={pp}
        onChange={(e) => setPp(e.target.value)}
        placeholder="Paragraph 2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <TextArea
        value={ppp}
        onChange={(e) => setPpp(e.target.value)}
        placeholder="Paragraph 3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <Button
        onClick={handleSave}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={isLoading}
      >
        {isLoading ? <SpinnerMini /> : "Save Changes"}
      </Button>
    </Container>
  );
};

export default ManageAboutUsInfo;
