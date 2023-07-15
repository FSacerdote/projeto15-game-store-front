import { BrowserRouter, Routes, Route } from "react-router-dom";

import ResetCss from "./style/reset";
import GlobalStyle from "./style/globalStyle";
import ItemsContextProvider from "./Contexts/ItemsContext";
import HomePage from "./Pages/HomePage";
import GamePage from "./Pages/GamePage";
import Cart from "./Pages/Cart";



function App() {
  return (
    <BrowserRouter>
      <ResetCss />
      <GlobalStyle />
      <ItemsContextProvider>
        <Routes>
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/carrinho" element={<Cart />} />
        </Routes>
      </ItemsContextProvider>
    </BrowserRouter>
  )
}

export default App
