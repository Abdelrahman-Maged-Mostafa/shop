import { useForm } from "react-hook-form";

function UpdateMe() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
        <h2>Update Personal Information</h2>
        <input {...register("name", { required: true })} placeholder="Name" />
        {errors.name && <span>Name is required</span>}
        <input {...register("email", { required: true })} placeholder="Email" />
        {errors.email && <span>Email is required</span>}
        <input {...register("phone", { required: true })} placeholder="Phone" />
        {errors.phone && <span>Phone is required</span>}
        <input
          {...register("address", { required: true })}
          placeholder="Address"
        />
        {errors.address && <span>Address is required</span>}
        <button type="submit">Update Info</button>
      </div>
    </form>
  );
}

export default UpdateMe;
