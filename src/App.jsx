import { BrowserRouter, Routes, Route } from "react-router-dom";

import ResetCss from "./style/reset";
import GlobalStyle from "./style/globalStyle";
import ItemsContextProvider from "./context/ItemsContext";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import Cart from "./pages/Cart";
import SuaLoja from "./pages/SuaLoja"
import NovoJogo from "./pages/NovoJogo"
import UserAuthProvider from "./context/UserAuthContext"
import Editar from "./pages/Editar"
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
console.log(UserAuthProvider);

function App() {
  return (
    <BrowserRouter>
      <ItemsContextProvider>
        <UserAuthProvider>
          <ResetCss />
          <GlobalStyle />
          <Routes>
            <Route path="/game/:id" element={<GamePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/sualoja" element={<SuaLoja />} />
            <Route path="/novo-jogo" element={<NovoJogo />} />
            <Route path="/editar/:id" element={<Editar />} />
          </Routes>
        </UserAuthProvider>
      </ItemsContextProvider>
    </BrowserRouter>
  )
};

export default App;