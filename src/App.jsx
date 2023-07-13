import { BrowserRouter, Routes, Route } from "react-router-dom"

import NavBar from "./Components/NavBar";
import Cart from "./Pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="/carrinho" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
