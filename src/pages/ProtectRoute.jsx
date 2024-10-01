import { cloneElement, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";

function ProtectRoute({ children, role = ["admin"] }) {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!role.includes(user.role)) navigate("/account");
    },
    [navigate, user.role, role]
  );
  return <>{cloneElement(children, { user })}</>;
}

export default ProtectRoute;
