import { useOutletContext } from "react-router";
import UpdateMe from "./UpdateMe";
import ChangePassword from "./ChangePassword";
import { useOptions } from "../../context/useOptions";
import { Helmet, HelmetProvider } from "react-helmet-async";

const PersonalInfo = () => {
  const { initialSEOData } = useOptions();
  const { user } = useOutletContext();
  return (
    <div className="personal-info">
      <HelmetProvider>
        <Helmet>
          <title>{initialSEOData?.personalInfoTitle || "shop"}</title>
          <meta
            name="description"
            content={initialSEOData?.personalInfoDescription || ""}
          />
          <meta
            name="keywords"
            content={initialSEOData?.personalInfoKeywords || ""}
          />
        </Helmet>
      </HelmetProvider>
      <UpdateMe user={user} />
      <ChangePassword />
    </div>
  );
};

export default PersonalInfo;
