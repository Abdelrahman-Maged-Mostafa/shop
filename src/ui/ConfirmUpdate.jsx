import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  position: fixed;
  top: 40%;
  background-color: var(--color-grey-0);
  z-index: 3;
  padding: 20px;
  border-radius: 6px;

  @media (max-width: 500px) {
    width: 30rem;
  }
  @media (max-width: 400px) {
    width: 25rem;
  }

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Grayfall = styled.div`
  position: fixed;
  width: 150%;
  height: 150%;
  background-color: #000000ae;
  top: -20%;
  left: -20%;
  z-index: 1;
`;

function ConfirmUpdate({ resourceName, onConfirm, disabled, close }) {
  return (
    <>
      <Grayfall onClick={close} />
      <StyledConfirmDelete>
        <Heading as="h3">Update {resourceName}</Heading>
        <p>Are you sure you want to Update this {resourceName} ?</p>

        <div>
          <Button variation="secondary" disabled={disabled} onClick={close}>
            Cancel
          </Button>
          <Button
            disabled={disabled}
            onClick={() => {
              onConfirm();
              close();
            }}
          >
            Update
          </Button>
        </div>
      </StyledConfirmDelete>
    </>
  );
}

export default ConfirmUpdate;
