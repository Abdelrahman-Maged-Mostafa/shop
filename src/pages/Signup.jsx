import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const Signup = () => {
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;

  function handleError(data) {
    console.log(data);
  }
  function handelFormSubmit(error) {
    console.log(error);
  }
  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(handelFormSubmit, handleError)}>
        <h2>Creat new account</h2>
        <Input
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
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
        <Input
          type="email"
          placeholder="Email"
          {...register("email", { required: "This field is required " })}
        />
        {errors?.email?.message && <Error>{errors.email.message}</Error>}
        <Input
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
        {errors?.password?.message && <Error>{errors.password.message}</Error>}
        <Input
          type="password"
          placeholder="Password confirm"
          {...register("passwordconfirm", {
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
        {errors?.passwordconfirm?.message && (
          <Error>{errors.passwordconfirm.message}</Error>
        )}
        <Button type="submit">Sign up</Button>
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
