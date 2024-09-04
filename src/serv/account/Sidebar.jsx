import { MdManageAccounts, MdWork, MdWorkHistory } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/account/personal-info" activeClassName="active">
        <MdManageAccounts />
        <span>Personal Information</span>
      </NavLink>
      <NavLink to="/account/active-orders" activeClassName="active">
        <MdWorkHistory />
        <span>Active Orders</span>
      </NavLink>
      <NavLink to="/account/order-history" activeClassName="active">
        <MdWork />
        <span>Order History</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
