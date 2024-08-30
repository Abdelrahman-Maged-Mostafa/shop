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
