import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getOneItems, updateOneItems } from "../api/items";
import Spinner from "../ui/Spinner";
import { useLogin } from "../context/useLogin";
import SpinnerMini from "../ui/SpinnerMini";
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

// React component
const EditItem = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [curItems, setCurItems] = useState({});
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const { data: item, isLoading } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getOneItems(itemId),
  });

  const { isLoading: isUpdated, mutate } = useMutation({
    mutationFn: ({ id, body, token }) => updateOneItems(id, body, token),
    onSuccess: (val) => {
      toast.success("Item successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", itemId] });
      navigate("/account/manage-items");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      price: "",
      shortDescription: "",
      stock: "",
      longDescription: "",
    },
  });

  useEffect(() => {
    if (item) {
      setCurItems(item.data.doc);
      reset({
        name: item.data.doc.name,
        price: item.data.doc.price,
        shortDescription: item.data.doc.shortDescription,
        stock: item.data.doc.stock,
        longDescription: item.data.doc.longDescription,
        images: item.data.doc.images,
        imageCover: item.data.doc.imageCover,
      });
    }
  }, [item, reset]);

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    if (files && files[0]) {
      const newImages = [...curItems.images];
      newImages[index] = URL.createObjectURL(files[0]);
      setCurItems({ ...curItems, images: newImages });
    }
  };

  const submitSuccess = (data) => {
    // mutate({ id: itemId, body: data, token: cookies.jwt });
    console.log(data);
  };

  if (isLoading) return <Spinner />;

  return (
    <Container>
      <Form onSubmit={handleSubmit(submitSuccess)}>
        <Title>Edit Product</Title>
        {curItems?.images?.map((image, index) => (
          <div key={index}>
            <Label>
              Image {index + 1}
              {index === 0 ? " & cover image" : ""}
            </Label>
            <ImagePreview src={image} alt={`Product Image ${index + 1}`} />
            <Input
              disabled={isUpdated}
              type="file"
              accept="image/*"
              {...register(`imagesType${index}`)}
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
        <ColorSizeForm register={register} />
        <Label>Price</Label>
        <Input
          disabled={isUpdated}
          type="number"
          {...register("price", { required: "This field is required " })}
        />
        <Label>Short Description</Label>
        <TextArea
          disabled={isUpdated}
          name="shortDescription"
          {...register("shortDescription", {
            required: "This field is required ",
          })}
        />
        <Label>Stock</Label>
        <Input
          disabled={isUpdated}
          type="number"
          {...register("stock", { required: "This field is required " })}
        />
        <Label>Long Description</Label>
        <TextArea
          disabled={isUpdated}
          {...register("longDescription", {
            required: "This field is required ",
          })}
        />
        <Button type="submit" disabled={isUpdated}>
          {isUpdated ? <SpinnerMini /> : "Save Changes"}
        </Button>
      </Form>
    </Container>
  );
};
export default EditItem;
