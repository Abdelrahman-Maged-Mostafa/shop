import styled from "styled-components";
import { motion } from "framer-motion";
import { useOptions } from "../context/useOptions";
import Button from "../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateOptionChangeColors,
  updateOptionDefaultColors,
} from "../api/option";
import toast from "react-hot-toast";
import { useLogin } from "../context/useLogin";
import SpinnerMini from "../ui/SpinnerMini";

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ColorInput = styled.input`
  margin: 10px;
  padding: 5px;
  border: 1px solid var(--color-grey-50);
  border-radius: 5px;
`;

const ColorLabel = styled.label`
  margin: 10px;
  font-weight: bold;
`;

const ColorSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 50px;
`;

const ColorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
  button {
    width: 130px;
  }
`;

const ColorManager = () => {
  const { colorsObj, setColorsObj, options } = useOptions();
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const { isLoading: isDefaulted, mutate: defaultFn } = useMutation({
    mutationFn: (token) => updateOptionDefaultColors(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option"] });
      toast.success("Default colors have been successfully set.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { isLoading: ischanged, mutate: changeFn } = useMutation({
    mutationFn: ({ body, token }) => updateOptionChangeColors({ body, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option"] });
      toast.success("New colors have been successfully set.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  delete colorsObj._id;

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    const realname = name.split(".");
    setColorsObj((prevColors) => ({
      ...prevColors,
      [realname[0]]: {
        ...prevColors[realname[0]],
        [realname[1]]: value,
      },
    }));
  };

  function handleDefaultColors() {
    defaultFn(cookies.jwt);
  }

  function handleChangeColors() {
    changeFn({ body: colorsObj, token: cookies.jwt });
  }
  return (
    <>
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Color Manager</h1>
        <h2>Light Mode Colors</h2>
        <ColorSection>
          {Object.keys(colorsObj.light).map((colorKey) => (
            <ColorBox key={colorKey}>
              <ColorLabel htmlFor={`light-${colorKey}`}>{colorKey}</ColorLabel>
              <ColorInput
                type="color"
                id={`light-${colorKey}`}
                name={`light.${colorKey}`}
                value={colorsObj.light[colorKey]}
                onChange={handleColorChange}
              />
            </ColorBox>
          ))}
        </ColorSection>
        <h2>Dark Mode Colors</h2>
        <ColorSection>
          {Object.keys(colorsObj.dark).map((colorKey) => (
            <ColorBox key={colorKey}>
              <ColorLabel htmlFor={`dark-${colorKey}`}>{colorKey}</ColorLabel>
              <ColorInput
                type="color"
                id={`dark-${colorKey}`}
                name={`dark.${colorKey}`}
                value={colorsObj.dark[colorKey]}
                onChange={handleColorChange}
              />
            </ColorBox>
          ))}
        </ColorSection>
      </Container>
      <StyledButtons>
        <Button
          disabled={isDefaulted || ischanged}
          onClick={handleChangeColors}
        >
          {ischanged ? <SpinnerMini /> : "Save Changes"}
        </Button>
        <Button
          onClick={() => setColorsObj(options?.data?.[0]?.colors)}
          disabled={isDefaulted || ischanged}
        >
          Reset
        </Button>
        <Button
          disabled={isDefaulted || ischanged}
          onClick={handleDefaultColors}
        >
          {isDefaulted ? <SpinnerMini /> : "Default"}
        </Button>
      </StyledButtons>
    </>
  );
};

export default ColorManager;
