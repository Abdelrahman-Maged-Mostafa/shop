import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";

function ManageItems() {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (user.role !== "admin") navigate("/account");
    },
    [navigate, user.role]
  );
  return <div>ManageItems</div>;
}

export default ManageItems;
