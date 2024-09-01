import { CiLogin } from "react-icons/ci";
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../../context/useLogin";

const PopupContainer = styled.div`
  display: ${({ show }) => (show === "true" ? "block" : "none")};
  direction: rtl;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  ul {
    right: 0;
    top: -2px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-md);
    padding: 10px;
    position: absolute;
    z-index: 9999;
    li,
    li a {
      display: flex;
      flex-direction: row-reverse;
      gap: 3px;
      color: var(--color-grey-800);
      font-size: 12px;
      &:hover {
        color: var(--color-brand-500);
      }
    }
  }
`;

const Overlay = styled.div`
  display: ${({ show }) => (show === "true" ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 999;
`;

const Popup = ({ show, onClose }) => {
  const { removeCookie, setLogin, checkLogin } = useLogin();

  async function handleLogout() {
    await removeCookie("jwt", { path: "/" });
    await checkLogin();
    setLogin(() => false);
    onClose();
  }
  return (
    <>
      <Overlay show={show} onClick={onClose} />
      <PopupContainer show={show}>
        <ul>
          <li onClick={onClose}>
            <Link to={"/account"}>
              <HiUser />
              <p>Account</p>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <CiLogin />
            <p>Logout</p>
          </li>
        </ul>
      </PopupContainer>
    </>
  );
};

export default Popup;
