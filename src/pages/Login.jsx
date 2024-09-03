import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../context/useLogin";
import { login } from "../api/user";
import toast from "react-hot-toast";
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

const ErrorStyle = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const Login = () => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const [isLoading, setIsLoading] = useState(false);
  const { setCookie, checkLogin, cookies, login: isLogin } = useLogin();
  const queryClint = useQueryClient();
  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: ({ id, token }) => addToCart(id, token),
    onSuccess: (val) => {
      queryClint.invalidateQueries({ queryKey: ["user"] });
      if (val) navigate("/cart");
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    function handleAddCartItem() {
      mutate({
        id: JSON.parse(localStorage.getItem("cartId")),
        token: cookies.jwt,
      });
      localStorage.removeItem("cartId");
    }

    if (isLogin) {
      if (localStorage.getItem("cartId")) {
        handleAddCartItem();
      } else {
        navigate("/");
      }
    }
  }, [cookies.jwt, isLogin, mutate, navigate]);

  async function handelFormSubmit(data) {
    setIsLoading(true);
    try {
      const getToken = await login(data);
      if (getToken.status === "error" || getToken.status === "fail")
        throw new Error("Wrong email or password");
      await setCookie("jwt", getToken.token, {
        path: "/",
        secure: true,
        sameSite: "None",
      });
      reset();
      toast.success("Your are login");
      await checkLogin();
    } catch (err) {
      toast.error(err.message);
    }
    setIsLoading(false);
  }

  if (isAdding) return <Spinner />;
  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(handelFormSubmit)}>
        <h2>Login</h2>
        <Input
          type="email"
          disabled={isLoading}
          placeholder="Email"
          {...register("email", { required: "This field is required " })}
        />
        {errors?.email?.message && (
          <ErrorStyle>{errors.email.message}</ErrorStyle>
        )}
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
          })}
        />
        {errors?.password?.message && (
          <ErrorStyle>{errors.password.message}</ErrorStyle>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Login"}
        </Button>
        <StyledP>
          Forgot your password?
          <Link to="/forgetPassword">
            <StyledLink> Reset Password</StyledLink>
          </Link>
        </StyledP>
        <StyledP>
          Don't have an account?
          <Link to="/signup">
            <StyledLink> Sign Up</StyledLink>
          </Link>
        </StyledP>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
