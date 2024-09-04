import UpdateMe from "./UpdateMe";
import ChangePassword from "./ChangePassword";
import { useOutletContext } from "react-router";

const PersonalInfo = () => {
  const { user } = useOutletContext();
  return (
    <div className="personal-info">
      <UpdateMe user={user} />
      <ChangePassword />
    </div>
  );
};

export default PersonalInfo;
