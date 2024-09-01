import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { resetPassword } from "../api/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLogin } from "../context/useLogin";
import SpinnerMini from "../ui/SpinnerMini";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-200);
  border-radius: 5px;
  box-shadow: var(--shadow-lg);
  width: 100%;
  margin: 10px 0;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid var(--color-grey-50);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  &:focus {
    border-color: var(--color-brand-500);
    outline: none;
  }
  &::placeholder {
    color: var(--color-grey-500);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: var(--color-brand-500);
  color: var(--color-grey-50);
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const ErrorStyle = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const ResetPassword = () => {
  const { token } = useParams();
  const { register, handleSubmit, formState, getValues } = useForm();
  const { setCookie, checkLogin } = useLogin();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { errors } = formState;

  async function handelFormSubmit(data) {
    console.log(data);
    try {
      setIsLoading(true);
      const getToken = await resetPassword(data, token);
      if (getToken.status !== "success")
        throw new Error("There was an error please send other link!");
      setCookie("jwt", getToken.token, {
        path: "/",
        secure: true,
        sameSite: "None",
      });
      await checkLogin();
      navigate("/");
      toast.success("Password changed!You are login now.");
    } catch (err) {
      toast.error(err.message);
    }
    setIsLoading(false);
  }
  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(handelFormSubmit)}>
        <h2>New password</h2>
        <Input
          type="password"
          disabled={isLoading}
          placeholder="Password"
          {...register("password", {
            required: "This field is required ",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters",
            },
            maxLength: {
              value: 25,
              message: "Password should be less than 25 characters",
            },
          })}
        />
        {errors?.password?.message && (
          <ErrorStyle>{errors.password.message}</ErrorStyle>
        )}
        <Input
          type="password"
          placeholder="Password confirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required ",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters",
            },
            maxLength: {
              value: 25,
              message: "Password should be less than 25 characters",
            },
            validate: (value) =>
              value === getValues().password ||
              "Password and password Confirm not the same ",
          })}
        />
        {errors?.passwordConfirm?.message && (
          <ErrorStyle>{errors.passwordConfirm.message}</ErrorStyle>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Change"}
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default ResetPassword;
