import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

import generateName from '../services/generateRandomName';

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

  useEffect(() => {
    axios.get("https://api.boardgameatlas.com/api/game/images?limit=20&client_id=JLBr5npPhV")
      .then(res => {
        setSelectedItems({
          items:
            res.data.images.map(game => ({
              itemId: game.id,
              itemName: generateName(),
              itemImgUrl: game.medium,
              itemPrice: Math.floor(Math.random() * 50).toFixed(2),
              itemQtde: 1,
            }))
          , total: 10
        });
      })
      .catch(err => console.log(err.response));
  }, []);

  return (
    <ItemsContext.Provider value={{ selectedItems, setSelectedItems }}>
      {children}
    </ItemsContext.Provider>
  )
};

export default ItemsContextProvider;