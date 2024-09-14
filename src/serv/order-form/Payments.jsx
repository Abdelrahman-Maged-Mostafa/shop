import styled from "styled-components";
import PaymentMethod from "./PaymentMethod";

const PayPhoto = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 30px;
  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }
  > div {
    cursor: pointer;
    > p {
      text-align: center;
    }
    &.active {
      /* background-color: var(--color-grey-400); */
      border: 1px solid var(--color-grey-500);
    }
  }
  margin: 10px 0 30px;
`;

function Payments({ payment, setPayment, totalPrice, register, disabled }) {
  return (
    <div>
      <PayPhoto>
        <div
          className={payment === "vcash" ? "active" : ""}
          onClick={() => setPayment("vcash")}
        >
          <img src="/images/v-cash.jpg" alt="vodafone" />
          <p>Vodafone cash</p>
        </div>
        <div
          className={payment === "binance" ? "active" : ""}
          onClick={() => setPayment("binance")}
        >
          <img src="/images/binance.jpg" alt="binance" />
          <p>Binance pay</p>
        </div>
        <div
          className={payment === "paypal" ? "active" : ""}
          onClick={() => setPayment("paypal")}
        >
          <img src="/images/paypal (1).png" alt="paypal" />
          <p>Binance pay</p>
        </div>
      </PayPhoto>
      {payment === "vcash" && (
        <PaymentMethod
          totalPrice={totalPrice}
          serviceAndAddress={`vodafone cash number 01020198197`}
          review={true}
          reviewTime={"2 hours"}
          customerBill={"transaction ID"}
          register={register}
          disabled={disabled}
        />
      )}
      {payment === "paypal" && (
        <PaymentMethod
          totalPrice={totalPrice}
          serviceAndAddress={`PayPal account podapoda_poda@yahoo.com `}
          review={true}
          reviewTime={"2 hours"}
          customerBill={"transaction ID"}
          register={register}
          disabled={disabled}
        />
      )}
      {payment === "binance" && (
        <PaymentMethod
          totalPrice={totalPrice}
          serviceAndAddress={`Binance pay id 0123456789`}
          review={true}
          reviewTime={"2 hours"}
          customerBill={"transaction ID"}
          register={register}
          disabled={disabled}
        />
      )}
    </div>
  );
}

export default Payments;
