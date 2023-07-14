import { createContext, useState } from 'react';

export const ItemsContext = createContext(null);


// items: [ Array of objects (items selected by the user), with the following structure:
// itemId: {
// itemName: ,
// itemGenre: ,
// itemImgUrl: ,
// itemPrice: ,
// itemQtde: ,
// }
// }]
const ItemsContextProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState({
    items: [{
      itemId: "10",
      itemName: "Naruto",
      itemGenre: "Anime",
      itemImgUrl: "https://wallpapers.com/images/featured/naruto-r5aa4v805ovp5cv4.jpg",
      itemPrice: 10,
      itemQtde: 1,
    }], total: 10
  })

  return (
    <ItemsContext.Provider value={{ selectedItems, setSelectedItems }}>
      {children}
    </ItemsContext.Provider>
  )
}

export default ItemsContextProvider;