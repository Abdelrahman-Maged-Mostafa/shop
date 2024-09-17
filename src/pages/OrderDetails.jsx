import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLogin } from "../context/useLogin";
import { motion } from "framer-motion";
import CardItemsOrder from "../serv/order-form/CardItemsOrder";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import ConfirmDelete from "../ui/ConfirmDelete";
import { useState } from "react";
import { deleteOneOrder, updateOneOrder } from "../api/orders";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";
import ConfirmUpdate from "../ui/ConfirmUpdate";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledP = styled.p`
  text-align: center;
`;
const DetailsCard = styled(motion.div)`
  background: var(--color-grey-0);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  margin: 10px;
  padding: 35px 10px 10px 10px;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align: center;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background: var(--color-grey-100);
  border-radius: 5px;
  .status {
    background-color: var(--color-brand-500);
    color: var(--color-brand-50);
    padding: 6px 9px;
    border-radius: 10px;
  }
  .payment {
    background-color: var(--color-green-100);
    color: var(--color-green-700);
    padding: 6px 9px;
    border-radius: 10px;
  }
  .complate {
    background-color: var(--color-grey-300);
    color: var(--color-grey-900);
    padding: 6px 9px;
    border-radius: 10px;
  }
`;

const Label = styled.span`
  font-weight: bold;
  color: var(--color-grey-700);
`;

const Value = styled.span`
  color: var(--color-grey-900);
  text-transform: capitalize;
`;
const StyledButoton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 25px;
`;

const ItemCard = styled(motion.div)`
  background: var(--color-grey-0);
  border-radius: 8px;
  margin: 10px 0;
  padding: 0 10px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-md);
  }
`;

const TimeStamp = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.9em;
  color: var(--color-grey-600);
`;

const Price = styled(motion.span)`
  color: var(--color-green-700);
  font-weight: bold;
  display: inline-block;
`;

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
function OrderDetails({ orderFunction, admin = false }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => orderFunction(cookies.jwt),
  });

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: ({ id, token }) => deleteOneOrder(id, token),
    onSuccess: async (val) => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order successfully deleted.");
      navigate(-1);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { isLoading: isUpdated, mutate: updateOrder } = useMutation({
    mutationFn: ({ id, token }) => updateOneOrder(id, token),
    onSuccess: async (val) => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order successfully updated.");
      navigate(-1);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const order = orders?.data?.data?.find((order) => order._id === orderId);

  function hnadleDeleteOrder() {
    mutate({ id: order?._id, token: cookies?.jwt });
  }
  function hnadleUpdateOrder() {
    updateOrder({ id: order?._id, token: cookies?.jwt });
  }
  if (isLoading) return <Spinner />;
  if (!order) return <StyledP>No order by this id.</StyledP>;
  return (
    <Container>
      {confirmDelete && (
        <ConfirmDelete
          onConfirm={hnadleDeleteOrder}
          resourceName={`order id: ${order._id}`}
          close={() => setConfirmDelete(false)}
          disabled={isDeleting}
        />
      )}
      {confirmUpdate && (
        <ConfirmUpdate
          onConfirm={hnadleUpdateOrder}
          resourceName={`order id: ${order._id}`}
          close={() => setConfirmUpdate(false)}
          disabled={isUpdated}
        />
      )}
      <DetailsCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TimeStamp>{new Date(order.createdAt).toLocaleString()}</TimeStamp>
        <Title>Order Details</Title>
        <DetailRow>
          <Label>ID:</Label>
          <Value>{order._id}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Payment method:</Label>
          <Value>{order.paymentMethod}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Total Price:</Label>
          <Price
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            ${calculateTotalPrice(order.items)}
          </Price>
        </DetailRow>
        <DetailRow>
          <Label>Name:</Label>
          <Value>{order.name}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Order Email:</Label>
          <Value>{order.email}</Value>
        </DetailRow>
        <DetailRow>
          <Label>User Email:</Label>
          <Value>{order.user.email}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Address:</Label>
          <Value>{order.address}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Phone:</Label>
          <Value>{order.phone}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Status:</Label>
          <Value
            className={
              order.status === "underReview"
                ? "status"
                : order.status === "completedPayment"
                ? "payment"
                : "complate"
            }
          >
            {order.status === "underReview" && "Under review"}
            {order.status === "completedPayment" && "Payment Successful"}
            {order.status === "completedOrder" && "completed"}
          </Value>
        </DetailRow>
        <DetailRow>
          <Label>Transaction ID:</Label>
          <Value>{order.transactionID}</Value>
        </DetailRow>
        {order.items.map((item, index) => (
          <ItemCard
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CardItemsOrder item={item} />
          </ItemCard>
        ))}
        {admin && order.status !== "completedOrder" && (
          <StyledButoton>
            <Button
              variation={"danger"}
              onClick={() => setConfirmDelete(true)}
              disabled={isUpdated || isDeleting}
            >
              {isDeleting ? <SpinnerMini /> : "Delete"}
            </Button>
            <Button
              disabled={isUpdated || isDeleting}
              onClick={() => setConfirmUpdate(true)}
            >
              {isUpdated ? (
                <SpinnerMini />
              ) : order.status === "underReview" ? (
                "Payment Successful"
              ) : (
                "Order Complete"
              )}
            </Button>
          </StyledButoton>
        )}
      </DetailsCard>
    </Container>
  );
}

export default OrderDetails;
