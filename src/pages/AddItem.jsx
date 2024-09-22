import { useLogin } from "../context/useLogin";
import SpinnerMini from "../ui/SpinnerMini";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import { createOneItems } from "../api/items";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import ColorSizeForm from "../serv/account/ColorSizeForm";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--color-grey-100);
  min-height: 100vh;
`;

const Form = styled.form`
  background: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid var(--color-grey-400);
  border-radius: 4px;
  width: 100%;
  background-color: var(--color-grey-0);
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid var(--color-grey-400);
  border-radius: 4px;
  width: 100%;
  background-color: var(--color-grey-0);
`;

const ImagePreview = styled.img`
  width: 100px;
  display: block;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: var(--color-brand-500);
  color: var(--color-grey-0);
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

function AddItem() {
  const { register, handleSubmit } = useForm();
  const [isPriceAndStock, setIsPriceAndStock] = useState(true);
  const navigate = useNavigate();
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const [images, setImages] = useState([0, 0, 0]);
  const [properties, setProperties] = useState({});

  const { isLoading: isUpdated, mutate } = useMutation({
    mutationFn: ({ body, token }) => createOneItems(body, token),
    onSuccess: (val) => {
      toast.success("Item successfully added.");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      navigate("/account/manage-items");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    if (files && files[0]) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(files[0]);
      setImages(newImages);
    }
  };
  function submitSuccess(data) {
    data.properties = JSON.stringify(properties);
    if (!data.price) delete data.price;
    if (!data.stock) delete data.stock;

    mutate({ body: data, token: cookies.jwt });
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit(submitSuccess)}>
        <Title>Edit Product</Title>
        {images.map((image, index) => (
          <div key={index}>
            <Label>
              Image {index + 1}
              {index === 0 ? " & cover image" : ""}
            </Label>
            {image !== 0 && (
              <ImagePreview src={image} alt={`Product Image ${index + 1}`} />
            )}
            <Input
              disabled={isUpdated}
              type="file"
              accept="image/*"
              {...register(`imagesType${index}`, {
                required: "This field is required ",
              })}
              onChange={(e) => handleImageChange(e, index)}
            />
          </div>
        ))}
        <Label>Name</Label>
        <Input
          disabled={isUpdated}
          type="text"
          {...register("name", { required: "This field is required " })}
        />
        <ColorSizeForm
          setProperties={setProperties}
          setIsPriceAndStock={setIsPriceAndStock}
        />
        {isPriceAndStock && (
          <>
            <Label>Price</Label>
            <Input
              disabled={isUpdated}
              type="number"
              {...register("price", { required: "This field is required " })}
            />
          </>
        )}
        <Label>Category</Label>
        <Input
          disabled={isUpdated}
          type="text"
          {...register("category", { required: "This field is required " })}
        />
        <Label>Short Description</Label>
        <TextArea
          disabled={isUpdated}
          name="shortDescription"
          {...register("shortDescription", {
            required: "This field is required ",
          })}
        />
        {isPriceAndStock && (
          <>
            <Label>Stock</Label>
            <Input
              disabled={isUpdated}
              type="number"
              {...register("stock", { required: "This field is required " })}
            />
          </>
        )}
        <Label>Long Description</Label>
        <TextArea
          disabled={isUpdated}
          {...register("longDescription", {
            required: "This field is required ",
          })}
        />
        <Button type="submit" disabled={isUpdated}>
          {isUpdated ? <SpinnerMini /> : "Add item"}
        </Button>
      </Form>
    </Container>
  );
}

export default AddItem;
