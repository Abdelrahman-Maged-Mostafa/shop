import { URL } from "../../URL(LINK)";

export async function signup(body) {
  const res = await fetch(`${URL}/api/v1/users/signup`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

export async function login(body) {
  const res = await fetch(`${URL}/api/v1/users/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

export async function isLogin(token) {
  const res = await fetch(`${URL}/api/v1/users/valid`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();

  if (data.token === "True valid") return true;
  return false;
}

export async function getMe(token) {
  const res = await fetch(`${URL}/api/v1/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();

  return data;
}

export async function forgetPassword(body) {
  const res = await fetch(`${URL}/api/v1/users/forgetPassword`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

export async function resetPassword(body, token) {
  const res = await fetch(`${URL}/api/v1/users/resetPassword/${token}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

export async function updateMe(body, token, path) {
  const res = await fetch(`${URL}/api/v1/users/${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

export async function getAllUsers(token) {
  const res = await fetch(`${URL}/api/v1/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (data.status === "fail" || data.status === "error")
    throw new Error("Some thing wrong! Please try again");
  return data;
}

export async function banUser(id, body, token) {
  const res = await fetch(`${URL}/api/v1/users/ban/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message);
  return data;
}

export async function unBanUser(id, token) {
  const res = await fetch(`${URL}/api/v1/users/unBan/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message);
  return data;
}
