import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useOptions } from "../context/useOptions";
import { useLogin } from "../context/useLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSomeStyle } from "../api/option";
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

const Label = styled.label`
  font-size: 1em;
  margin-bottom: 5px;
  display: block;
`;

const Select = styled.select`
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

const ChangeStyle = () => {
  const { dashboardStyle, headerStyle } = useOptions();
  const [option, setOptions] = useState({ dashboardStyle, headerStyle });
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ body, token }) => updateSomeStyle(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option"] });
      toast.success("New Style have been successfully set.");
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
  useEffect(
    () => setOptions({ dashboardStyle, headerStyle } || {}),
    [dashboardStyle, headerStyle]
  );

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
        <Title>Header and Dashboard style</Title>
        <Label htmlFor="headerStyle">Header style</Label>
        <Select
          id="headerStyle"
          name="headerStyle"
          value={option?.headerStyle}
          onChange={handleChange}
        >
          <option value="style1">style1</option>
          <option value="style2">style2</option>
          <option value="style3">style3</option>
          <option value="style4">style4</option>
        </Select>
        <Label htmlFor="dashboardStyle">Dashboard style </Label>
        <Select
          id="dashboardStyle"
          name="dashboardStyle"
          value={option.dashboardStyle}
          onChange={handleChange}
        >
          <option value="style1">style 1</option>
          <option value="style2">style 2</option>
          <option value="style3">style 3</option>
          <option value="style4">style 4</option>
          <option value="style5">style 5</option>
          <option value="style6">style 6</option>
          <option value="style7">style 7</option>
          <option value="style8">style 8</option>
          <option value="style9">style 9</option>
          <option value="style10">style 10</option>
          <option value="style11">style 11</option>
          <option value="style12">style 12</option>
          <option value="style13">style 13</option>
          <option value="style14">style 14</option>
          <option value="style15">style 15</option>
          <option value="style16">style 16</option>
          <option value="style17">style 17</option>
          <option value="style18">style 18</option>
          <option value="style19">style 19</option>
          <option value="style20">style 20</option>
          <option value="style21">style 21</option>
          <option value="style22">style 22</option>
          <option value="style23">style 23</option>
          <option value="style24">style 24</option>
          <option value="style25">style 25</option>
          <option value="style26">style 26</option>
          <option value="style27">style 27</option>
          <option value="style28">style 28</option>
          <option value="style29">style 29</option>
          <option value="style30">style 30</option>
          <option value="style31">style 31</option>
          <option value="style32">style 32</option>
        </Select>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Save Changes"}
        </Button>
      </Card>
    </StyledPage>
  );
};

export default ChangeStyle;
