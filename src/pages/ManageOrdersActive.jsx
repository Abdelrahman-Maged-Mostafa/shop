import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../api/orders";
import { useLogin } from "../context/useLogin";

function ManageOrdersActive() {
  const { cookies } = useLogin();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: () => getAllOrders(cookies.jwt),
  });
  console.log(orders);
  return (
    <div>
      {orders?.data?.data?.map((order, i) => (
        <div style={{ marginBottom: "200px" }}>
          <p>Order {i + 1}</p>
          <p>{order.name}</p>
          <p>{order.address}</p>
          <p>{order.email}</p>
          <p>{order.phone}</p>
          <p>{order.status}</p>
          <p style={{ marginBottom: "40px" }}>{order.transactionID}</p>
          {order?.items?.map((item, index) => (
            <div style={{ marginBottom: "40px" }}>
              <p>Item {index + 1}</p>
              <p>{item.item}</p>
              <p>{item.properties.quantity}</p>
              <p>{item.properties.price}</p>
              {item.properties.color && <p>{item.properties.color}</p>}
              {item.properties.size && <p>{item.properties.size}</p>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ManageOrdersActive;
