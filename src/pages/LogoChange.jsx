import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOptionChangeLogo } from "../api/option";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";
import { useLogin } from "../context/useLogin";
import { useOptions } from "../context/useOptions";

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-grey-0);
  color: var(--color-grey-900);
  transition: all 0.3s ease;
  padding: 20px;
`;

const Logo = styled(motion.img)`
  width: 120px;
  height: 70px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const Warning = styled(motion.p)`
  color: var(--color-red-700);
  font-size: 12px;
  text-align: center;
  margin-bottom: 10px;
`;

const Input = styled(motion.input)`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid var(--color-grey-0);
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: var(--color-brand-500);
  color: var(--color-grey-0);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

function LogoChange() {
  const { logo } = useOptions();
  const { cookies } = useLogin();
  const [curLogo, setLogo] = useState(logo || null);
  const [logoSaved, setLogoSaved] = useState(null);
  const queryClient = useQueryClient();
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
      setLogoSaved(file);
    }
  };
  useEffect(() => setLogo(logo || null), [logo]);
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ body, token }) => updateOptionChangeLogo({ body, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option"] });
      toast.success("New Logo have been successfully set.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleLogoSave() {
    const formData = new FormData();
    formData.append("photo", logoSaved);
    mutate({ body: formData, token: cookies.jwt });
  }

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }}>
        Logo
      </motion.h1>
      {curLogo && (
        <Logo
          src={curLogo}
          alt="Logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      <Input
        type="file"
        accept="image/*"
        onChange={handleLogoChange}
        initial={{ x: -20 }}
        animate={{ x: 0 }}
      />
      <Warning initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Ensure the logo is 120x70px and has a transparent background.
      </Warning>
      <Button onClick={handleLogoSave} disabled={isLoading}>
        {isLoading ? <SpinnerMini /> : "Save Changes"}
      </Button>
    </Container>
  );
}

export default LogoChange;
