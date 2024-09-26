import { useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { FaInfo, FaSquare } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { GiArmoredBoomerang } from "react-icons/gi";
import { GoNumber } from "react-icons/go";
import { IoColorPaletteOutline } from "react-icons/io5";
import {
  MdCategory,
  MdManageAccounts,
  MdOutlineRateReview,
  MdPayments,
  MdProductionQuantityLimits,
  MdWork,
  MdWorkHistory,
} from "react-icons/md";
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
  p {
    color: var(--color-brand-50);
    text-align: center;
    order: -1;
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
    text-decoration: underline;
    margin: 20px;
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

const Sidebar = ({ user }) => {
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
      {user.role === "admin" ? (
        <>
          <p>Admin list</p>
          <NavLink to="/account/manage-items">
            <MdProductionQuantityLimits />
            <span>Manage items</span>
          </NavLink>
          <NavLink to="/account/manage-reviews">
            <MdOutlineRateReview style={{ verticalAlign: "middle" }} />
            <span>Manage reviews</span>
          </NavLink>
          <NavLink to="/account/change-categorys">
            <MdCategory style={{ verticalAlign: "middle" }} />
            <span>Manage categorys</span>
          </NavLink>
          <NavLink to="/account/change-offers">
            <BiSolidOffer style={{ verticalAlign: "middle" }} />
            <span>Manage offers</span>
          </NavLink>
          <NavLink to="/account/manage-offers-line">
            <BiSolidOffer style={{ verticalAlign: "middle" }} />
            <span>Manage offers Line</span>
          </NavLink>
          <NavLink to="/account/manage-orders-active">
            <MdWork />
            <span>Manage orders active</span>
          </NavLink>
          <NavLink to="/account/manage-orders-history">
            <MdWorkHistory />
            <span>Manage orders history</span>
          </NavLink>
          <NavLink to="/account/manage-users">
            <FaUsersGear />
            <span>Manage users</span>
          </NavLink>
          <NavLink to="/account/manage-payments">
            <MdPayments />
            <span>Manage payments</span>
          </NavLink>
          <NavLink to="/account/change-style">
            <IoColorPaletteOutline />
            <span>Change colors</span>
          </NavLink>
          <NavLink to="/account/change-logo">
            <FaSquare />
            <span>Change logo</span>
          </NavLink>
          <NavLink to="/account/change-footer">
            <FaInfo />
            <span>Change Footer info</span>
          </NavLink>
          <NavLink to="/account/change-aboutUs">
            <FaInfo />
            <span>Change AboutUs info</span>
          </NavLink>
          <NavLink to="/account/change-Numbers">
            <GoNumber />
            <span>Change numbers items</span>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/account/active-orders">
            <MdWorkHistory />
            <span>Active Orders</span>
          </NavLink>
          <NavLink to="/account/order-history">
            <MdWork />
            <span>Order History</span>
          </NavLink>
        </>
      )}
    </SidebarStyled>
  );
};

export default Sidebar;
