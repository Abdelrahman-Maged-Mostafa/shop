// ManagePayments.js
import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useOptions } from "../context/useOptions";
import { HiTrash } from "react-icons/hi2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLogin } from "../context/useLogin";
import { updateOption } from "../api/option";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  @media screen and (max-width: 500px) {
    padding: 0px;
  }
`;

const Card = styled(motion.div)`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-400);
  border-radius: 8px;
  padding: 20px;
  width: 280px;
  box-shadow: var(--shadow-lg);
  position: relative;
  @media screen and (max-width: 400px) {
    width: 250px;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid var(--color-grey-400);
  border-radius: 4px;
  width: 100%;
  background-color: var(--color-grey-0);
  &:focus {
    outline: none;
  }
`;

const FileInput = styled.input`
  margin-bottom: 20px;
`;

const ToggleButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
`;

const ToggleCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ active }) =>
    active === "active" ? "var(--color-brand-500)" : "var(--color-grey-500)"};
  transition: transform 0.3s ease;
  transform: ${({ active }) =>
    active === "active" ? "translateX(20px)" : "translateX(0)"};
`;

const ToggleTrack = styled.div`
  width: 40px;
  height: 20px;
  background-color: var(--color-grey-300);
  border-radius: 10px;
  margin-right: 10px;
  position: relative;
`;

const Button = styled.button`
  background-color: var(--color-brand-500);
  color: var(--color-brand-50);
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  @media screen and (max-width: 400px) {
    padding: 6px 9px;
    font-size: 14px;
  }
`;

const DeleteButton = styled.div`
  background-color: var(--color-red-500);
  color: var(--color-red-700);
  border: none;
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    color: var(--color-red-800);
  }
`;

const WarningText = styled.p`
  color: var(--color-red-700);
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 20px;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ManagePayments = () => {
  const { payments } = useOptions();
  const [paymentMethods, setPaymentMethods] = useState(payments);
  const [photos, setPhotos] = useState(payments?.map((pay) => pay.photo));
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const { isLoading: isUpdated, mutate } = useMutation({
    mutationFn: ({ body, token }) => updateOption(body, token),
    onSuccess: (val) => {
      toast.success("Item successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["option"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleToggle = (index) => {
    const updatedMethods = [...paymentMethods];
    updatedMethods[index].active = !updatedMethods[index].active;
    setPaymentMethods(updatedMethods);
  };

  const handleChange = (index, field, value) => {
    const updatedMethods = [...paymentMethods];
    updatedMethods[index][field] = value;
    setPaymentMethods(updatedMethods);
  };

  const handleFileChange = (index, file) => {
    const updatedMethods = [...paymentMethods];
    const updatesPhotos = [...photos];
    updatesPhotos[index] = URL.createObjectURL(file);
    updatedMethods[index].photo = file;
    setPaymentMethods(updatedMethods);
    setPhotos(updatesPhotos);
  };

  const handleDelete = (index) => {
    const updatedMethods = paymentMethods.filter((_, i) => i !== index);
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    setPaymentMethods(updatedMethods);
  };

  const handleAddNew = () => {
    const newMethod = {
      name: "",
      photo: "",
      message: "",
      needTimeReview: true,
      timeForReview: "",
      active: true,
    };
    setPaymentMethods([...paymentMethods, newMethod]);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const error = paymentMethods.filter((pay) => !pay.photo);
    if (error?.length > 0) return toast.error("Please photo is required");
    mutate({ body: paymentMethods, token: cookies.jwt });
  };
  return (
    <form onSubmit={handleSaveChanges}>
      <Container>
        {paymentMethods?.map((method, index) => (
          <Card
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <DeleteButton
              onClick={() => handleDelete(index)}
              disabled={isUpdated}
            >
              <HiTrash />
            </DeleteButton>
            <h3>{method.name}</h3>
            <img
              src={photos[index]}
              alt={method.name}
              style={{
                width: "100%",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            />
            <WarningText>Photo should be 1000px * 500px</WarningText>
            <FileInput
              type="file"
              onChange={(e) => handleFileChange(index, e.target.files[0])}
            />
            <Input
              disabled={isUpdated}
              required
              type="text"
              value={method.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="Name"
            />
            <Input
              disabled={isUpdated}
              type="text"
              required
              value={method.message}
              onChange={(e) => handleChange(index, "message", e.target.value)}
              placeholder="Your account in Message"
            />
            <Input
              disabled={isUpdated}
              type="text"
              required
              value={method.timeForReview}
              onChange={(e) =>
                handleChange(index, "timeForReview", e.target.value)
              }
              placeholder="Time for Review"
            />
            <ToggleButton
              onClick={() => handleToggle(index)}
              disabled={isUpdated}
            >
              <ToggleTrack>
                <ToggleCircle active={method.active ? "active" : "Inactive"} />
              </ToggleTrack>
              {method.active ? "Active" : "Inactive"}
            </ToggleButton>
          </Card>
        ))}
      </Container>
      <StyledButtons>
        <Button disabled={isUpdated}>
          {isUpdated ? <SpinnerMini /> : "Save Changes"}
        </Button>
        <Button type="reset" onClick={handleAddNew}>
          Add New Method
        </Button>
      </StyledButtons>
    </form>
  );
};

export default ManagePayments;
