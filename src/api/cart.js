import toast from "react-hot-toast";
import { URL } from "../../URL(LINK)";

export async function addToCart(itemId, token) {
  try {
    const res = await fetch(`${URL}/api/v1/users/addToCart/${itemId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401)
      throw new Error("Please login to add item to your cart");
    if (!res.ok) throw new Error("Some thing wrong! Please try again");
    toast.success("Item added to your cart");
    return true;
  } catch (err) {
    toast.error(err.message);
  }
}

export async function removeFromCart(itemId, token) {
  try {
    const res = await fetch(`${URL}/api/v1/users/removeFromCart/${itemId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401)
      throw new Error("Please login to add item to your cart");
    if (!res.ok) throw new Error("Some thing wrong! Please try again");
    toast.success("Item removed from your cart");
    return true;
  } catch (err) {
    toast.error(err.message);
  }
}
