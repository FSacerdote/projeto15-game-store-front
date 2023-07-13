import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ResetCss from "./style/reset"
import GlobalStyle from "./style/globalStyle"
import GamePage from "./pages/GamePage"
import Cart from "./Pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <ResetCss/>
      <GlobalStyle/>
      <Routes>
        <Route path="/game/:id" element={<GamePage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/carrinho" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
