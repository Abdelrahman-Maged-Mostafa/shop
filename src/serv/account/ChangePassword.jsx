import { useForm } from "react-hook-form";
import { useLogin } from "../../context/useLogin";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../../api/user";
import SpinnerMini from "../../ui/SpinnerMini";
import { useEffect, useState } from "react";

const ErrorStyle = styled.p`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function ChangePassword() {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const { cookies, setCookie, checkLogin } = useLogin();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ data, token, path }) => updateMe(data, token, path),
    onSuccess: async (val) => {
      if (val.status === "success") {
        await setCookie("jwt", val.token, {
          path: "/",
          secure: true,
          sameSite: "None",
        });
        reset();
        await checkLogin();
        toast.success("Your password changed.");
        setPasswordChanged(true);
      } else {
        toast.error(val.message);
      }
    },
  });

  useEffect(() => {
    if (passwordChanged) {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setPasswordChanged(false); // Reset the state
    }
  }, [passwordChanged, queryClient]);

  const onSubmit = (data) => {
    mutate({ data, token: cookies.jwt, path: "updateMyPassword" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
        <h2>Change Password</h2>
        <input
          disabled={isLoading}
          {...register("oldPassword", {
            required: "This field is required ",
            minLength: {
              value: 8,
              message: "Old password should be at least 8 characters",
            },
            maxLength: {
              value: 8,
              message: "Old password should be less than 25 characters",
            },
          })}
          placeholder="Old Password"
          type="password"
        />
        {errors.oldPassword && (
          <ErrorStyle>{errors.oldPassword.message}</ErrorStyle>
        )}
        <input
          disabled={isLoading}
          {...register("newPassword", {
            required: "This field is required ",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters",
            },
            maxLength: {
              value: 8,
              message: "Password should be less than 25 characters",
            },
          })}
          placeholder="New Password"
          type="password"
        />
        {errors.newPassword && (
          <ErrorStyle>{errors.newPassword.message}</ErrorStyle>
        )}
        <input
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required ",
            minLength: {
              value: 8,
              message: "Password confirm should be at least 8 characters",
            },
            maxLength: {
              value: 25,
              message: "Password confirm should be less than 25 characters",
            },
            validate: (value) =>
              value === getValues().newPassword ||
              "Password and password confirm not the same ",
          })}
          placeholder="Confirm New Password"
          type="password"
        />
        {errors.passwordConfirm && (
          <ErrorStyle>{errors.passwordConfirm.message}</ErrorStyle>
        )}
        <button type="submit" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Change Password"}
        </button>
      </div>
    </form>
  );
}

export default ChangePassword;
