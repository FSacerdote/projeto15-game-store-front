import { BrowserRouter, Routes, Route } from "react-router-dom";

import ResetCss from "./style/reset";
import GlobalStyle from "./style/globalStyle";
import ItemsContextProvider from "./Contexts/ItemsContext";
import HomePage from "./Pages/HomePage";
import GamePage from "./Pages/GamePage";
import Cart from "./Pages/Cart";
import SuaLoja from "./pages/SuaLoja"
import NovoJogo from "./pages/NovoJogo"
import { UserContextProvider } from "./components/UserContext"
import Editar from "./pages/Editar"



function App() {
  return (
    <BrowserRouter>
      <ItemsContextProvider>
        <UserContextProvider>
          <ResetCss/>
          <GlobalStyle/>
          <Routes>
            <Route path="/game/:id" element={<GamePage/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/sualoja" element={<SuaLoja />} />
            <Route path="/novo-jogo" element={<NovoJogo />} />
            <Route path="/editar/:id" element={<Editar />} />
          </Routes>
        </UserContextProvider>
      </ItemsContextProvider>
    </BrowserRouter>
  )
}

export default App
