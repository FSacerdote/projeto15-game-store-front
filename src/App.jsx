import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ResetCss from "./style/reset"
import GlobalStyle from "./style/globalStyle"
import GamePage from "./pages/GamePage"

function App() {
  return (
    <BrowserRouter>
      <ResetCss/>
      <GlobalStyle/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/game/:id" element={<GamePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
