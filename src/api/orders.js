import { URL } from "../../URL(LINK)";

export async function createOneOrder(body, token) {
  const res = await fetch(`${URL}/api/v1/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export async function getAllOrders(token) {
  const res = await fetch(`${URL}/api/v1/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);
  return data;
}
export async function getAllUserOrders(token) {
  const res = await fetch(`${URL}/api/v1/orders/userOrder`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);
  return data;
}

export async function deleteOneOrder(id, token) {
  const res = await fetch(`${URL}/api/v1/orders/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Some thing wrong! Please try again");
}

export async function updateOneOrder(id, token) {
  const res = await fetch(`${URL}/api/v1/orders/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message);
  return data;
}
