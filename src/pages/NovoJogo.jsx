import { styled } from "styled-components"
import NavBar from "../components/NavBar"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserAuthContext"

export default function NovoJogo() {

    const [titulo, setTitulo] = useState("")
    const [preco, setPreco] = useState("")
    const [descricao, setDescricao] = useState("")
    const [capa, setCapa] = useState("")
    const [genero, setGenero] = useState("")

    const navigate = useNavigate()
    const { userData: { token } } = useContext(UserContext)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])

    function addGame(event) {
        event.preventDefault()
        const newGame = { titulo, valor: Number(preco.replace(",", ".")).toFixed(2), capa, descricao, genero }
        axios.post(`${import.meta.env.VITE_API_URL}/games`, newGame, config)
            .then(() => navigate("/sualoja"))
            .catch((erro) => console.log(erro.message))
    }


    return (
        <Pagina>
            {/*  <Container>   */}
            <h1>NOVO JOGO</h1>
            <Form onSubmit={addGame}>
                <input type="text" placeholder="Titulo" value={titulo} onChange={(event) => setTitulo(event.target.value)} required />
                <input type="text" placeholder="Preço" value={preco} onChange={(event) => setPreco(event.target.value)} required />
                <input type="text" placeholder="Descrição" value={descricao} onChange={(event) => setDescricao(event.target.value)} required />
                <input type="text" placeholder="URl da imagem de capa" value={capa} onChange={(event) => setCapa(event.target.value)} required />
                <input type="text" placeholder="Gênero" value={genero} onChange={(event) => setGenero(event.target.value)} required />
                <button type="submit">Adicionar jogo</button>
            </Form>
            {/* </Container> */}
            <NavBar />
        </Pagina>
    )
}

const Pagina = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width:100%;
    background-color: #375971ff;
    padding-top: 100px;
    h1{
        color: #ff61c6ff;
        font-size: 20px;
    }
`

const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 13px;
    input{
        width: 300px;
        height: 50px;
        font-size: 17px;
        //background-color: #375971ff;
        background-color: #0a0c37ff;
        color: white;
        border-radius: 5px;
        border-color: #ff61c6ff;
    }
    button{
        font-size: 17px;
        height: 50px;
        background-color: #487494;
        color:white;
        border: none;
        border-radius: 5px;
        &:hover{
            cursor: pointer;
            filter: brightness(0.9);
        }
    }
`

const Container = styled.div`
    padding-top: 70px;
    background-color: #0a0c37ff;
    border: 0.5px solid #ff61c6ff;
    width: 85%;
    height: 90%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
`