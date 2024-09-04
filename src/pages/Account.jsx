import { Outlet } from "react-router";
import Sidebar from "../serv/account/Sidebar";
import StyledContainer from "../serv/account/StyledContainer";

function Account() {
  return (
    <StyledContainer>
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </StyledContainer>
  );
}

export default Account;
