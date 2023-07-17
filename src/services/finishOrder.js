import axios from "axios";

export default async (userData, selectedItems, token) => {
  let success = false;
  let reqMessage = "";

  const config = token ? {
    headers: {
      Authorization: `Bearer ${token}`
    }
  } : {};
  const request = await axios.post(`${import.meta.env.VITE_API_URL}/carrinho`, {
    userInfo: { ...userData },
    selectedItems,
  }, config)
  console.log(request);

  if (request.status === 201) success = true;

  return success;
}