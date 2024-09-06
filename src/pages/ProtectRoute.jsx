import { cloneElement, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";

function ProtectRoute({ children }) {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (user.role !== "admin") navigate("/account");
    },
    [navigate, user.role]
  );
  return <>{cloneElement(children, { user })}</>;
}

export default ProtectRoute;
