import { Outlet } from "react-router";
import Sidebar from "../serv/account/Sidebar";
import StyledContainer from "../serv/account/StyledContainer";
import { useLogin } from "../context/useLogin";
import styled from "styled-components";
import { getMe } from "../api/user";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";

const StyledP = styled.p`
  text-align: center;
`;

function Account() {
  const { login, cookies } = useLogin();
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(cookies.jwt),
  });
  const user = userData?.data?.doc;
  if (isLoading) return <Spinner />;
  if (!login || !userData?.data?.doc)
    return <StyledP>Please Login to see your cart items.</StyledP>;
  return (
    <StyledContainer>
      <Sidebar />
      <div className="content">
        <Outlet context={{ user }} />
      </div>
    </StyledContainer>
  );
}

export default Account;
