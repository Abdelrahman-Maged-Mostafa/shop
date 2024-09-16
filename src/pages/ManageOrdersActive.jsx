import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLogin } from "../context/useLogin";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Spinner from "../ui/Spinner";
import Pagination from "../serv/dashboard/Pagination";
import FilterAndSortedOrders from "../serv/order-form/FilterAndSortedOrders";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  @media screen and (max-width: 450px) {
    padding: 20px 0 40px 0;
  }
`;

const OrderCard = styled(motion(Link))`
  background: var(--color-grey-100);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 40px 10px 20px;
  width: 100%;
  text-decoration: none;
  color: inherit;
  position: relative;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const OrderTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align: center;
`;

const OrderDetail = styled.p`
  font-size: 1em;
  color: var(--color-grey-900);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .status {
    background-color: var(--color-brand-500);
    color: var(--color-brand-50);
    padding: 6px 9px;
    border-radius: 10px;
    text-transform: capitalize;
  }
  .payment {
    background-color: var(--color-green-100);
    color: var(--color-green-700);
    padding: 6px 9px;
    border-radius: 10px;
    text-transform: capitalize;
  }
  .complate {
    background-color: var(--color-grey-300);
    color: var(--color-grey-900);
    padding: 6px 9px;
    border-radius: 10px;
    text-transform: capitalize;
  }
`;

const Label = styled.span`
  font-weight: bold;
  color: var(--color-grey-900);
`;

const Value = styled.span`
  color: var(--color-grey-900);
`;

const CreatedAt = styled.div`
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
  return items.reduce(
    (total, item) => total + item.properties.price * item.properties.quantity,
    0
  );
};

function ManageOrdersActive({
  active = false,
  orderFunction,
  linkTo = "manage-orders-active",
}) {
  const { cookies } = useLogin();
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt-desc";
  const [field, direction] = sortBy?.split("-");
  const { data: orders, isLoading } = useQuery({
    queryKey: active ? ["ordersActive"] : ["ordersHistory"],
    queryFn: () => orderFunction(cookies.jwt),
  });
  const ordersActiveFilter = orders?.data?.data
    ?.filter((order) => order.status !== "completedOrder")
    ?.map((order) => {
      return { ...order, price: calculateTotalPrice(order?.items) };
    });

  const ordersHistoryFilter = orders?.data?.data
    ?.filter((order) => order.status === "completedOrder")
    ?.map((order) => {
      return { ...order, price: calculateTotalPrice(order?.items) };
    });

  const numItemInPage = 5;
  const startItem = (page - 1) * numItemInPage;
  const endItem = page * numItemInPage;
  const allData = active
    ? ordersActiveFilter
        ?.filter((order) => order?.status?.includes(filterValue))
        ?.sort((a, b) => {
          if (field === "createdAt")
            return direction === "asc"
              ? new Date(a[field]) - new Date(b[field])
              : new Date(b[field]) - new Date(a[field]);
          else
            return direction === "asc"
              ? a[field] - b[field]
              : b[field] - a[field];
        })
    : ordersHistoryFilter;
  const numPages = Math.ceil(allData?.length / numItemInPage);
  const myData = allData?.slice(startItem, endItem);

  if (isLoading) return <Spinner />;
  return (
    <Container>
      {active && <FilterAndSortedOrders />}
      <Pagination
        setPage={setPage}
        page={page}
        numPages={numPages}
        style={{ margin: "15px", position: "relative" }}
      />
      {myData?.map((order, i) => (
        <OrderCard
          key={order._id}
          to={`/account/${linkTo}/${order._id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: i / 3 }}
        >
          <CreatedAt>{new Date(order.createdAt).toLocaleString()}</CreatedAt>
          <OrderTitle>Order {(page - 1) * numItemInPage + (i + 1)}</OrderTitle>
          <OrderDetail>
            <Label>ID:</Label>
            <Value>{order._id}</Value>
          </OrderDetail>
          <OrderDetail>
            <Label>Email:</Label>
            <Value>{order.email}</Value>
          </OrderDetail>

          <OrderDetail>
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
              ${order.price}
            </Price>
          </OrderDetail>
          <OrderDetail>
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
          </OrderDetail>
          <OrderDetail>
            <Label>Payment Method:</Label>
            <Value style={{ textTransform: "capitalize" }}>
              {order.paymentMethod}
            </Value>
          </OrderDetail>
          <OrderDetail>
            <Label>Transaction ID:</Label>
            <Value>{order.transactionID}</Value>
          </OrderDetail>
        </OrderCard>
      ))}
    </Container>
  );
}

export default ManageOrdersActive;
