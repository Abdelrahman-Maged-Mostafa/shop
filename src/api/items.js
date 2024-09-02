import { URL } from "../../URL(LINK)";

export async function getAllItems() {
  const res = await fetch(`${URL}/api/v1/items`);
  const data = await res.json();
  if (data.status === "fail" || data.status === "error")
    throw new Error("Some thing wrong! Please try again");
  return data;
}

export async function getOneItems(id) {
  const res = await fetch(`${URL}/api/v1/items/${id}`);
  const data = await res.json();
  if (data.status === "fail" || data.status === "error")
    throw new Error("Some thing wrong! Please try again");
  return data;
}
