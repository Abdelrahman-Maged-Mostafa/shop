import { useForm } from "react-hook-form";
import styled from "styled-components";
import InputPhone from "./InputPhone";
import { useLogin } from "../../context/useLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../../api/user";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";
import { useEffect, useState } from "react";

const ErrorStyle = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function UpdateMe({ user }) {
  const { cookies } = useLogin();
  const [curUser, setCurUser] = useState(user);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: curUser.name,
      email: curUser.email,
      phone: curUser.phone || "",
      address: curUser.address || "",
    },
  });
  useEffect(() => {
    setCurUser(user);
  }, [user]);

  const queryClint = useQueryClient();
  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: ({ data, token, path }) => updateMe(data, token, path),
    onSuccess: (val) => {
      queryClint.invalidateQueries({ queryKey: ["user"] });
      if (val.status === "success") toast.success("Your information updated.");
      else toast.error(val.message);
    },
  });

  const onSubmit = (data) => {
    mutate({ data, token: cookies.jwt, path: "updateMe" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
        <h2>Update Personal Information</h2>
        <input
          {...register("name", { required: "This field is required " })}
          placeholder="Name"
          disabled={isAdding}
        />
        {errors.name && <ErrorStyle>{errors.name.message}</ErrorStyle>}
        <input
          type="email"
          {...register("email", {
            required: "This field is required ",
          })}
          placeholder="Email"
          disabled={isAdding}
        />
        {errors.email && <ErrorStyle>{errors.email.message}</ErrorStyle>}
        {/* <input type="tel" {...register("phone", {})} placeholder="Phone" />
        {errors.phone && <ErrorStyle>{errors.phone.message}</ErrorStyle>} */}
        <InputPhone control={control} errors={errors} disabled={isAdding} />
        <input
          {...register("address", {})}
          placeholder="Address"
          disabled={isAdding}
        />
        {errors.address && <ErrorStyle>{errors.address.message}</ErrorStyle>}
        <button type="submit" disabled={isAdding}>
          {isAdding ? <SpinnerMini /> : "Update Info"}
        </button>
      </div>
    </form>
  );
}

export default UpdateMe;
