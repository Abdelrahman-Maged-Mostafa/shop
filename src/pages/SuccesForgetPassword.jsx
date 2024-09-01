import styled from "styled-components";

const StyledP = styled.div`
  text-align: center;
  p {
    margin-top: 30px;
  }
`;

function SuccesForgetPassword() {
  return (
    <StyledP>
      <p>
        Your reset password link send to your email address please check it!
      </p>
      <p>
        If you didn't receive this message, please wait 10 minutes and then
        check your inbox and spam folder. Please verify if this email is indeed
        your email address.
      </p>
      <p>Thank you!</p>
    </StyledP>
  );
}

export default SuccesForgetPassword;
