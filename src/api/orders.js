import { URL } from "../../URL(LINK)";

// export async function getOneItems(id) {
//   const res = await fetch(`${URL}/api/v1/items/${id}`);
//   const data = await res.json();
//   if (data.status === "fail" || data.status === "error")
//     throw new Error("Some thing wrong! Please try again");
//   return data;
// }

// export async function deleteOneItems(id, token) {
//   const res = await fetch(`${URL}/api/v1/items/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) throw new Error("Some thing wrong! Please try again");
// }

// export async function updateOneItems(id, body, token) {
//   const formData = new FormData();
//   // Append all fields from the body to the formData
//   for (const key of Object.keys(body)) {
//     if (key === "images")
//       body.images.forEach((value, i) => {
//         formData.append(`images[${i}]`, value);
//       });
//     else {
//       if (key.startsWith("imagesType")) formData.append(key, body[key][0]);
//       else formData.append(key, body[key]);
//     }
//   }
//   //send req
//   const res = await fetch(`${URL}/api/v1/items/${id}`, {
//     method: "PATCH",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message);
// }

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

export async function getUserOrderById(id, token) {
  const res = await fetch(`${URL}/api/v1/orders/userOrder/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (data.status === "fail" || data.status === "error")
    throw new Error(data.message);
  return data;
}

export async function getOrderById(id, token) {
  const res = await fetch(`${URL}/api/v1/orders/${id}`, {
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
