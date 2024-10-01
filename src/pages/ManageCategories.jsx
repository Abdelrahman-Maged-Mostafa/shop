import { useReducer } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useOptions } from "../context/useOptions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLogin } from "../context/useLogin";
import { updateCategorysPhoto } from "../api/option";
import SpinnerMini from "../ui/SpinnerMini";
import toast from "react-hot-toast";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const CategoryCard = styled(motion.div)`
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

const initialState = (categories) => ({
  categoryEdit: categories.map((category) => ({ ...category })),
  categoryPhotos: categories.map((category) => ({ ...category })),
});

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_PHOTO":
      const newPhotos = [...state.categoryPhotos];
      newPhotos[action.index].photo = URL.createObjectURL(action.file);
      const newCategory = [...state.categoryEdit];
      newCategory[action.index].photo = action.file;
      return {
        ...state,
        categoryPhotos: newPhotos,
        categoryEdit: newCategory,
      };
    default:
      return state;
  }
};

function ManageCategories() {
  const { categories } = useOptions();
  const [state, dispatch] = useReducer(reducer, categories, initialState);
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ body, token }) => updateCategorysPhoto(body, token),
    onSuccess: (val) => {
      toast.success("Update category photos successful");
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

  const handleSavePhoto = () => {
    const formData = new FormData();
    state.categoryEdit.forEach((cate, index) => {
      formData.append(`${index}name`, cate.name);
      formData.append(`${index}photo`, cate.photo);
    });
    mutate({ body: formData, token: cookies.jwt });
  };

  return (
    <Container>
      {state.categoryPhotos.map((category, index) => (
        <CategoryCard
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CategoryImage src={category.photo} alt={category.name} />
          <CategoryName>{category.name}</CategoryName>
          <FileInput
            type="file"
            onChange={(event) => handlePhotoChange(index, event)}
          />
          <Warning>Image needs to be 1200px * 800px</Warning>
        </CategoryCard>
      ))}
      <SaveButton onClick={handleSavePhoto} disabled={isLoading}>
        {isLoading ? <SpinnerMini /> : "Save Changes"}
      </SaveButton>
    </Container>
  );
}

export default ManageCategories;
