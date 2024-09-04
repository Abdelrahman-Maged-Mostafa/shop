import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";

import { signup } from "../api/user";
import { useLogin } from "../context/useLogin";
import SpinnerMini from "../ui/SpinnerMini";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../api/cart";
import Spinner from "../ui/Spinner";

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

const StyledP = styled.p`
  margin-top: 10px;
  @media (max-width: 420px) {
    font-size: 14px;
  }
  @media (max-width: 375px) {
    font-size: 12px;
  }
  @media (max-width: 343px) {
    font-size: 10px;
  }
`;
const StyledLink = styled.span`
  color: var(--color-brand-500);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorP = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const Signup = () => {
  const { register, handleSubmit, getValues, reset, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setCookie, cookies, login } = useLogin();
  const queryClint = useQueryClient();

  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: ({ id, token }) => addToCart(id, token),
    onSuccess: (val) => {
      queryClint.invalidateQueries({ queryKey: ["user"] });
      if (val) navigate("/cart");
    },
  });

  useEffect(() => {
    function handleAddCartItem() {
      mutate({
        id: JSON.parse(localStorage.getItem("cartId")),
        token: cookies.jwt,
      });
      localStorage.removeItem("cartId");
    }

    if (login) {
      if (localStorage.getItem("cartId")) {
        handleAddCartItem();
      } else {
        navigate("/");
      }
    }
  }, [cookies.jwt, login, mutate, navigate]);

  async function handelFormSubmit(data) {
    setIsLoading(true);
    try {
      const getToken = await signup(data);
      if (getToken.status === "error")
        throw new Error("Please write true email");
      if (getToken.status === "fail")
        throw new Error(
          "You already have an account. Please reset your password."
        );
      setCookie("jwt", getToken.token, {
        path: "/",
        secure: true,
        sameSite: "None",
      });
      reset();
      toast.success("Your account ready! Welcome");
    } catch (err) {
      toast.error(err.message);
    }
    setIsLoading(false);
  }
  if (isAdding) return <Spinner />;
  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(handelFormSubmit)}>
        <h2>Create new account</h2>
        <Input
          disabled={isLoading}
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "This field is required ",
            maxLength: {
              value: 25,
              message: "Your name should be less than 25 characters",
            },
            minLength: {
              value: 3,
              message: "Your name should be at least 3 characters",
            },
          })}
        />
        {errors?.name?.message && <ErrorP>{errors.name.message}</ErrorP>}
        <Input
          disabled={isLoading}
          type="email"
          placeholder="Email"
          {...register("email", { required: "This field is required " })}
        />
        {errors?.email?.message && <ErrorP>{errors.email.message}</ErrorP>}
        <Input
          disabled={isLoading}
          type="password"
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
          <ErrorP>{errors.password.message}</ErrorP>
        )}
        <Input
          disabled={isLoading}
          type="password"
          placeholder="Password confirm"
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
          <ErrorP>{errors.passwordConfirm.message}</ErrorP>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Sign up"}
        </Button>
        <StyledP>
          Forgot your password?
          <Link to="/forgetPassword">
            <StyledLink> Reset Password</StyledLink>
          </Link>
        </StyledP>
        <StyledP>
          You have an account?
          <Link to="/login">
            <StyledLink> Login</StyledLink>
          </Link>
        </StyledP>
      </LoginForm>
    </LoginContainer>
  );
};

export default Signup;
