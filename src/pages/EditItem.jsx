import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getOneItems } from "../api/items";
import Spinner from "../ui/Spinner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

const Form = styled.form`
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #0056b3;
  }
`;

// React component
const EditItem = () => {
  const { itemId } = useParams();
  const [curItems, setCurItems] = useState({});
  const { data: item, isLoading } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getOneItems(itemId),
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
    console.log(data);
  };

  if (isLoading) return <Spinner />;

  return (
    <Container>
      <Form onSubmit={handleSubmit(submitSuccess)}>
        <Title>Edit Product</Title>
        {curItems?.images?.map((image, index) => (
          <div key={index}>
            <Label>Image {index + 1}</Label>
            <ImagePreview src={image} alt={`Product Image ${index + 1}`} />
            <Input
              type="file"
              accept="image/*"
              {...register(`image[${index + 1}]`, {})}
              onChange={(e) => handleImageChange(e, index)}
            />
          </div>
        ))}
        <Label>Name</Label>
        <Input
          type="text"
          {...register("name", { required: "This field is required " })}
        />
        <Label>Price</Label>
        <Input
          type="number"
          {...register("price", { required: "This field is required " })}
        />
        <Label>Short Description</Label>
        <TextArea
          name="shortDescription"
          {...register("shortDescription", {
            required: "This field is required ",
          })}
        />
        <Label>Stock</Label>
        <Input
          type="number"
          {...register("stock", { required: "This field is required " })}
        />
        <Label>Long Description</Label>
        <TextArea
          {...register("longDescription", {
            required: "This field is required ",
          })}
        />
        <Button type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
};
export default EditItem;
