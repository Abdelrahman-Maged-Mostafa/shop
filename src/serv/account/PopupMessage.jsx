import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled(motion.div)`
  padding: 40px;
  border-radius: 10px;
  background-color: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  min-width: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  z-index: 999999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: var(--color-grey-0);
  color: var(--color-grey-900);
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const Label = styled.p`
  margin-bottom: 10px;
`;

const PopupMessage = ({ isOpen, togglePopup, user }) => {
  return (
    <div>
      {isOpen && (
        <>
          <Backdrop onClick={togglePopup} />
          <Popup
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={togglePopup}>X</CloseButton>
            <Label>Name: {user.name}</Label>
            <Label>Email: {user.email}</Label>
          </Popup>
        </>
      )}
    </div>
  );
};

export default PopupMessage;
