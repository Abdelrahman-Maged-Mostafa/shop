import { URL } from "../../URL(LINK)";

export async function getOption() {
  const res = await fetch(`${URL}/api/v1/option`);
  const data = await res.json();
  if (data.status === "fail" || data.status === "error")
    throw new Error("Some thing wrong! Please try again");
  return data;
}

export async function updateOption(body, token) {
  const formData = new FormData();
  // Append all fields from the body to the formData
  body.forEach((item, index) => {
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        formData.append(`${index}[${key}]`, item[key]);
      }
    }
  });
  //send req
  const res = await fetch(`${URL}/api/v1/option`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

export async function updateOptionCash(token) {
  //send req
  const res = await fetch(`${URL}/api/v1/option/cash`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

export async function updateOptionDefaultColors(token) {
  //send req
  const res = await fetch(`${URL}/api/v1/option/defaultColors`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

export async function updateOptionChangeColors({ body, token }) {
  //send req
  const res = await fetch(`${URL}/api/v1/option/changeColors`, {
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

export async function updateOptionChangeLogo({ body, token }) {
  //send req
  const res = await fetch(`${URL}/api/v1/option/changeLogo`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
