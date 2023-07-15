import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ResetCss from "./style/reset"
import GlobalStyle from "./style/globalStyle"
import GamePage from "./pages/GamePage"
import Cart from "./Pages/Cart";
import SuaLoja from "./pages/SuaLoja"
import NovoJogo from "./pages/NovoJogo"
import { UserContextProvider } from "./components/UserContext"
import Editar from "./pages/Editar"

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ResetCss/>
        <GlobalStyle/>
        <Routes>
          <Route path="/game/:id" element={<GamePage/>}/>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/sualoja" element={<SuaLoja />} />
          <Route path="/novo-jogo" element={<NovoJogo />} />
          <Route path="/novo-jogo" element={<NovoJogo />} />
          <Route path="/editar/:id" element={<Editar />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
