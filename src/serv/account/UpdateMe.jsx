import { useForm } from "react-hook-form";
import styled from "styled-components";
import InputPhone from "./InputPhone";

const ErrorStyle = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function UpdateMe({ user }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
        <h2>Update Personal Information</h2>
        <input
          {...register("name", { required: "This field is required " })}
          placeholder="Name"
        />
        {errors.name && <ErrorStyle>{errors.name.message}</ErrorStyle>}
        <input
          type="email"
          {...register("email", {
            required: "This field is required ",
          })}
          placeholder="Email"
        />
        {errors.email && <ErrorStyle>{errors.email.message}</ErrorStyle>}
        {/* <input type="tel" {...register("phone", {})} placeholder="Phone" />
        {errors.phone && <ErrorStyle>{errors.phone.message}</ErrorStyle>} */}
        <InputPhone control={control} errors={errors} />
        <input {...register("address", {})} placeholder="Address" />
        {errors.address && <ErrorStyle>{errors.address.message}</ErrorStyle>}
        <button type="submit">Update Info</button>
      </div>
    </form>
  );
}

export default UpdateMe;
