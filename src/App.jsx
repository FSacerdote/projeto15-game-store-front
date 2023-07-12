import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"

function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  )
}

export default App;

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`