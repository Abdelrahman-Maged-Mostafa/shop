import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useOptions } from "../context/useOptions";
import { useLogin } from "../context/useLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateANALYTICSGOOGLE } from "../api/option";
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

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  height: 300px;
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

const ManageAnalytics = () => {
  const { ANALYTICSGOOGLE } = useOptions();
  const [code, setCode] = useState(ANALYTICSGOOGLE || "");
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ body, token }) => updateANALYTICSGOOGLE(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option"] });
      toast.success("New ANALYTICS GOOGLE have been successfully set.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const handleChange = (e) => {
    setCode(e.target.value);
  };
  useEffect(() => setCode(ANALYTICSGOOGLE || ""), [ANALYTICSGOOGLE]);

  const handleSave = () => {
    mutate({ body: { ANALYTICSGOOGLE: code }, token: cookies.jwt });
  };

  return (
    <StyledPage>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>page</Title>
        <TextArea
          placeholder="Google Code"
          value={code}
          onChange={handleChange}
        />
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Save Changes"}
        </Button>
      </Card>
    </StyledPage>
  );
};

export default ManageAnalytics;
