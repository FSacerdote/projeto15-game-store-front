import { createContext, useEffect, useState } from 'react';

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
    items: [], total: 0
  });

  return (
    <ItemsContext.Provider value={{ selectedItems, setSelectedItems }}>
      {children}
    </ItemsContext.Provider>
  )
};

export default ItemsContextProvider;