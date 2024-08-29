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
