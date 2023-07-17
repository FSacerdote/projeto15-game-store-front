import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }

    body {
        background-color: #375971ff;
    }

    h1, h2, h3, h4, h5, h6, a {
        font-family: 'Tektur', cursive;
    }

     h1, a {
        font-weight: 700;
        font-size: 22px;
        text-decoration: none;
    }

    a {
        color: #0a0c37ff;
    }
`
export default GlobalStyle