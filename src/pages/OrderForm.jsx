import styled from "styled-components";
import { useLogin } from "../context/useLogin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "../api/user";
import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";
import Payments from "../serv/order-form/Payments";
import { useForm } from "react-hook-form";
import InputPhone from "../serv/account/InputPhone";
import { useEffect, useState } from "react";
import { createOneOrder } from "../api/orders";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { removeAllCart } from "../api/cart";
import { useOptions } from "../context/useOptions";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--color-grey-0);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  max-width: 600px;
  margin: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  input {
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid var(--color-grey-400);
    border-radius: 4px;
    width: 100%;
    background-color: var(--color-grey-0);
  }
  .PhoneInputCountrySelect {
    background-color: var(--color-grey-100);
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
`;

const Button = styled.button`
  padding: 10px;
  background-color: var(--color-brand-700);
  color: var(--color-brand-100);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-brand-500);
  }
`;

const ReceiptContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: var(--color-grey-100);
  border-radius: 8px;
  box-shadow: var(--shadow-mg);
  width: 100%;
`;

const ReceiptItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
`;

const StyledP = styled.p`
  text-align: center;
`;

const OrderForm = () => {
  const itemsCart = JSON.parse(localStorage.getItem("itemsCheckOut"))?.map(
    (item) => {
      return {
        ...item.properties,
        itemId: item.item.id,
        imageCover: item.item.imageCover,
        name: item.item.name,
      };
    }
  );
  const { options } = useOptions();
  const paymentMethod = options?.data?.[0]?.paymentMethod;
  const navigate = useNavigate();
  const [payment, setPayment] = useState(paymentMethod?.[0]?.name || "");
  const queryClient = useQueryClient();
  const { login, cookies } = useLogin();
  const { mutate } = useMutation({
    mutationFn: (token) => removeAllCart(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const { isLoading: isAdded, mutate: addOrder } = useMutation({
    mutationFn: ({ body, token }) => createOneOrder(body, token),
    onSuccess: async (val) => {
      if (val.status === "success") {
        await queryClient.invalidateQueries({ queryKey: ["ordersActive"] });
        toast.success("Your order has been successfully submitted.");
        localStorage.removeItem("itemsCheckOut");
        mutate(cookies.jwt);
        navigate("/");
      }
      if (val.status === "fail" || val.status === "error")
        toast.error("Something went wrong. Please try again.");
    },
  });
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(cookies.jwt),
  });
  const user = userData?.data?.doc;
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });
  useEffect(() => {
    if (user) {
      reset({
        name: user?.name,
        email: user?.email,
        phone: user?.phone || "",
        address: user?.address || "",
      });
    }
  }, [user, reset]);
  useEffect(() => {
    reset({
      paymentMethod: payment,
    });
  }, [payment, reset]);
  useEffect(() => {
    setPayment(paymentMethod?.[0]?.name || "");
  }, [paymentMethod]);
  const totalPrice = itemsCart?.reduce(
    (cur, item) => cur + item?.price * item?.quantity,
    0
  );

  async function handleSuccessfulySubmit(data) {
    data.items = itemsCart;
    addOrder({ body: JSON.stringify(data), token: cookies.jwt });
  }

  if (isLoading) return <Spinner />;
  if (!login || !userData?.data?.doc)
    return <StyledP>Please Login to see your profile.</StyledP>;
  return (
    <FormContainer>
      <h2>Order Form</h2>
      <Form onSubmit={handleSubmit(handleSuccessfulySubmit)}>
        <Input
          type="text"
          placeholder="Name"
          {...register("name", { required: "This field is required " })}
          disabled={isAdded}
        />
        <Input
          type="email"
          placeholder="Email"
          {...register("email", { required: "This field is required " })}
          disabled={isAdded}
        />
        <InputPhone control={control} errors={errors} disabled={isAdded} />

        <Input
          type="text"
          placeholder="Address"
          {...register("address", { required: "This field is required " })}
          disabled={isAdded}
        />
        <Payments
          payment={payment}
          setPayment={setPayment}
          totalPrice={totalPrice}
          register={register}
          disabled={isAdded}
        />
        <Button type="submit" disabled={isAdded}>
          {isAdded ? <SpinnerMini /> : "Submit"}
        </Button>
      </Form>
      <ReceiptContainer>
        <h3>Payment Receipt</h3>
        {itemsCart?.map((item, i) => (
          <ReceiptItem key={i}>
            <span>
              {item?.quantity} - {item?.name}
            </span>
            <span>$ {item?.quantity * item?.price}</span>
          </ReceiptItem>
        ))}
        <ReceiptItem>
          <span>Total</span>
          <span>$ {totalPrice}</span>
        </ReceiptItem>
      </ReceiptContainer>
    </FormContainer>
  );
};

export default OrderForm;
