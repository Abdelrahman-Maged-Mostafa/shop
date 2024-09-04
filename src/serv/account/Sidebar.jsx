import { useState } from "react";
import { GiArmoredBoomerang } from "react-icons/gi";
import { MdManageAccounts, MdWork, MdWorkHistory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const moved = keyframes`
     0% {
    top: -3px;
  }
  100% {
    top: 2px;
  }
`;

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    & div svg {
      animation: ${moved} 0.5s infinite alternate;
    }
  }
  a {
    order: -1;
  }
`;

const StyledMore = styled.div`
  svg {
    position: relative;
    color: var(--color-brand-50);
    transform: rotate(135deg);
    cursor: pointer;
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <SidebarStyled
      className="sidebar"
      style={{ maxHeight: open ? "100000px" : "" }}
    >
      <NavLink to="/account/personal-info">
        <MdManageAccounts />
        <span>Personal Information</span>
      </NavLink>
      <StyledMore
        onClick={() => setOpen((open) => !open)}
        style={{ order: open ? "4" : "-1" }}
      >
        <GiArmoredBoomerang
          style={{
            transform: open ? "rotate(-45deg)" : "rotate(135deg)",
          }}
        />
      </StyledMore>
      <NavLink to="/account/active-orders">
        <MdWorkHistory />
        <span>Active Orders</span>
      </NavLink>
      <NavLink to="/account/order-history">
        <MdWork />
        <span>Order History</span>
      </NavLink>
    </SidebarStyled>
  );
};

export default Sidebar;
