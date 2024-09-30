import { URL } from "../../URL(LINK)";

export async function createTicket(body, token) {
  //send req
  const res = await fetch(`${URL}/api/v1/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

export async function getAllUserTickets(token) {
  //send req
  const res = await fetch(`${URL}/api/v1/tickets/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

export async function updateTicket(id, body, token) {
  //send req
  const res = await fetch(`${URL}/api/v1/tickets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
