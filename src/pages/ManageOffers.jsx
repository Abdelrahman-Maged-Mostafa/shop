import { useReducer } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa"; // Import the trash icon
import { useOptions } from "../context/useOptions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLogin } from "../context/useLogin";
import { updateOffersPhoto } from "../api/option";
import SpinnerMini from "../ui/SpinnerMini";
import toast from "react-hot-toast";
import Empty from "../ui/Empty";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const CategoryCard = styled(motion.div)`
  position: relative; // Add this to position the trash icon
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-lg);
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 100%;
  max-width: 400px;
`;

const TrashIcon = styled(FaTrash)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: var(--color-red-700);
`;

const CategoryImage = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const CategoryName = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const FileInput = styled.input`
  margin-top: 10px;
  width: 100%;
  max-width: 200px;
`;

const Warning = styled.p`
  color: var(--color-red-700);
  font-size: 0.9em;
  margin-top: 5px;
`;

const SaveButton = styled.button`
  margin-top: 20px;
  width: 150px;
  padding: 10px 20px;
  font-size: 1em;
  color: var(--color-grey-0);
  background-color: var(--color-brand-500);
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const initialState = (offers) => ({
  categoryEdit: offers.map((offer) => offer),
  categoryPhotos: offers.map((offer) => offer),
});

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_PHOTO":
      const newPhotos = [...state.categoryPhotos];
      newPhotos[action.index] = URL.createObjectURL(action.file);
      const newCategory = [...state.categoryEdit];
      newCategory[action.index] = action.file;
      return {
        ...state,
        categoryPhotos: newPhotos,
        categoryEdit: newCategory,
      };
    case "ADD_PHOTO":
      const newIndex = [...state.categoryPhotos, 1];
      return {
        ...state,
        categoryPhotos: newIndex,
      };
    case "DELETE_PHOTO":
      const updatedPhotos = state.categoryPhotos.filter(
        (_, i) => i !== action.index
      );
      const updatedCategory = state.categoryEdit.filter(
        (_, i) => i !== action.index
      );
      return {
        ...state,
        categoryPhotos: updatedPhotos,
        categoryEdit: updatedCategory,
      };
    default:
      return state;
  }
};

function ManageOffers() {
  const { offers } = useOptions();
  const [state, dispatch] = useReducer(reducer, offers, initialState);
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ body, token }) => updateOffersPhoto(body, token),
    onSuccess: (val) => {
      toast.success("Update Offers photos successful");
      queryClient.invalidateQueries({ queryKey: ["option"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const handlePhotoChange = (index, event) => {
    dispatch({
      type: "CHANGE_PHOTO",
      index,
      file: event.target.files[0],
    });
  };

  const handleAddPhoto = () => {
    dispatch({
      type: "ADD_PHOTO",
    });
  };

  const handleDeletePhoto = (index) => {
    dispatch({
      type: "DELETE_PHOTO",
      index,
    });
  };

  const handleSavePhoto = () => {
    const formData = new FormData();
    state.categoryEdit.forEach((cate, index) => {
      formData.append(`${index}name`, cate);
    });
    mutate({ body: formData, token: cookies.jwt });
  };

  return (
    <Container>
      {(!offers || offers.length === 0) && <Empty resource={"Offers"} />}
      {state.categoryPhotos.map((category, index) => (
        <CategoryCard
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TrashIcon onClick={() => handleDeletePhoto(index)} />
          <CategoryImage src={category} alt={`photo ${index + 1}`} />
          <CategoryName>photo {index + 1}</CategoryName>
          <FileInput
            type="file"
            onChange={(event) => handlePhotoChange(index, event)}
          />
          <Warning>Image needs to be 1200px * 600px</Warning>
        </CategoryCard>
      ))}
      <SaveButton onClick={handleAddPhoto} disabled={isLoading}>
        Add Photo
      </SaveButton>
      <SaveButton onClick={handleSavePhoto} disabled={isLoading}>
        {isLoading ? <SpinnerMini /> : "Save Changes"}
      </SaveButton>
    </Container>
  );
}

export default ManageOffers;
