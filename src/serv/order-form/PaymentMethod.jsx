import styled from "styled-components";

const PaymentMethodStyle = styled.div`
  > * {
    margin-bottom: 15px;
  }
  > div {
    display: flex;
    align-items: center;
    > input {
      width: fit-content;
      margin: auto 10px auto 0;
    }
  }
`;
function PaymentMethod({
  serviceAndAddress,
  disabled = false,
  review = true,
  reviewTime = "2 hours",
  customerBill = "phone number",
  totalPrice,
  register,
}) {
  return (
    <PaymentMethodStyle>
      <p>
        Please send the amount of ${totalPrice} to the {serviceAndAddress} and
        write the transaction ID in the input below.
      </p>
      {review && <p>This payment method will take {reviewTime} to review.</p>}
      <input
        type="text"
        disabled={disabled}
        placeholder={customerBill}
        {...register("transactionID", {
          required: "This field is required ",
        })}
      />
      <div>
        <input type="checkbox" required disabled={disabled} />
        <span>Please send the amount first .</span>
      </div>
    </PaymentMethodStyle>
  );
}

export default PaymentMethod;
