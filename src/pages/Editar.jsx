import { styled } from "styled-components"
import NavBar from "../components/NavBar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

export default function Editar() {

    const { id } = useParams()

    const [titulo, setTitulo] = useState("")
    const [preco, setPreco] = useState("")
    const [descricao, setDescricao] = useState("")
    const [capa, setCapa] = useState("")
    const [genero, setGenero] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/game/${id}`)
            .then((response) => {
                setTitulo(response.data.titulo)
                setPreco(response.data.valor)
                setDescricao(response.data.descricao)
                setCapa(response.data.capa)
                setGenero(response.data.genero)
            })
            .catch((erro) => console.log(erro.message))
    }, [])

    function editGame(event) {
        event.preventDefault()
        const gameEditado = { titulo, preco, descricao, capa, genero }
        axios.put(`${import.meta.env.VITE_API_URL}/editar/${id}`, gameEditado)
            .then(() => navigate("/sualoja"))
            .catch((erro) => console.log(erro.message))
    }


    return (
        <Pagina>
            {/*  <Container>   */}
            <h1>Insira os novos dados</h1>
            <Form onSubmit={editGame}>
                <input type="text" placeholder="Titulo" value={titulo} onChange={(event) => setTitulo(event.target.value)} required />
                <input type="text" placeholder="Preço" value={preco} onChange={(event) => setPreco(event.target.value)} required />
                <input type="text" placeholder="Descrição" value={descricao} onChange={(event) => setDescricao(event.target.value)} required />
                <input type="text" placeholder="URl da imagem de capa" value={capa} onChange={(event) => setCapa(event.target.value)} required />
                <input type="text" placeholder="Gênero" value={genero} onChange={(event) => setGenero(event.target.value)} required />
                <button type="submit">Confirmar alteações</button>
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