// src/components/PhoneNumberInput.js
import { Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styled from "styled-components";
const ErrorStyle = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
const InputPhone = ({ control, errors }) => {
  return (
    <>
      <Controller
        name="phone"
        control={control}
        rules={{
          required: "Phone number is required",
          validate: (value) =>
            isValidPhoneNumber(value) || "Invalid phone number",
        }}
        render={({ field }) => (
          <PhoneInput
            {...field}
            placeholder="Enter phone number"
            defaultCountry="US"
            international
            style={{ width: "100%" }}
          />
        )}
      />
      {errors.phone && <ErrorStyle>{errors.phone.message}</ErrorStyle>}
    </>
  );
};

export default InputPhone;
