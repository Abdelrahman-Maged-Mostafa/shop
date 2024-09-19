import styled from "styled-components";
import PaymentMethod from "./PaymentMethod";
import { useOptions } from "../../context/useOptions";

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
  const {
    options: {
      data: [{ paymentMethod }],
    },
  } = useOptions();
  return (
    <div>
      <PayPhoto>
        {paymentMethod?.map(
          (methode) =>
            methode.active && (
              <div
                key={methode.name}
                className={payment === methode.name ? "active" : ""}
                onClick={() => setPayment(methode.name)}
              >
                <img src={methode.photo} alt={methode.name} />
                <p>{methode.name}</p>
              </div>
            )
        )}
      </PayPhoto>
      {paymentMethod?.map(
        (methode) =>
          payment === methode.name && (
            <PaymentMethod
              key={methode.name}
              totalPrice={totalPrice}
              serviceAndAddress={methode.message}
              review={methode.needTimeReview}
              reviewTime={methode.timeForReview}
              customerBill={"transaction ID"}
              register={register}
              disabled={disabled}
            />
          )
      )}
    </div>
  );
}

export default Payments;
