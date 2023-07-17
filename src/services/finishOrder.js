import axios from "axios";

export default (userData, selectedItems, token) => {
  let success = false;

  const config = token ? {
    headers: {
      Authorization: `Bearer ${token}`
    }
  } : {};
  axios.post(`${import.meta.env.VITE_API_URL}/carrinho`, {
    userInfo: { ...userData },
    selectedItems,
  }, config).then(() => success = true)
    .catch(err => console.log(err.response));

  return success;
}