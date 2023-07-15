import axios from "axios";

export default (formData, selectedItems) => {
  axios.post(`${import.meta.env.VITE_API_URL}/carrinho`,
    {
      userInfo: { ...formData },
      itemsInfo: selectedItems.items.map(
        item => ({ itemName: item.itemName, itemQtde: item.itemQtde })
      ),
      total: selectedItems.total
    }
  )
}