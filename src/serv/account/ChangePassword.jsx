import { useForm } from "react-hook-form";

function ChangePassword() {
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
        <h2>Change Password</h2>
        <input
          {...register("oldPassword", { required: true })}
          placeholder="Old Password"
          type="password"
        />
        {errors.oldPassword && <span>Old Password is required</span>}
        <input
          {...register("newPassword", {
            required: true,
            minLength: 8,
            maxLength: 25,
          })}
          placeholder="New Password"
          type="password"
        />
        {errors.newPassword && (
          <span>Password must be between 8 and 25 characters</span>
        )}
        <input
          {...register("newPasswordConfirm", { required: true })}
          placeholder="Confirm New Password"
          type="password"
        />
        {errors.newPasswordConfirm && <span>Confirm Password is required</span>}
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ChangePassword;
