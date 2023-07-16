import { styled } from "styled-components"
import NavBar from "../Components/NavBar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function GamePage(){

    const {id} = useParams()
    const [game, setGame] = useState(null)

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/game/${id}`)
            .then((response)=>{
                setGame(response.data)
            })
            .catch((error)=>console.log(error.message))
    }, [])


    if(!game){
        return(
            <Page>
                <NavBar/>
                <Container>
                    Carregando....
                </Container>
            </Page>
        )
    }

    return(
        <Page>
            <NavBar/>
            <Container>
                <Banner src={game.capa}></Banner>
                <Infos>
                    <h1>Titulo: {game.titulo}</h1>
                    <h2>Descrição: {game.descricao}</h2>
                    <p>Gênero: {game.genero}</p>
                </Infos>
                <Adicionar><span>R${game.valor}</span></Adicionar>
            </Container>
        </Page>
    )
}

const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width:100%;
    background-color: #375971ff;
`

const Container = styled.div`
    margin-top: 150px;
    width: 500px;
`

const Banner = styled.img`
    width: 500px;
`

const Infos = styled.div`
    h1{
        font-size: 25px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    h2{
        margin-bottom: 10px;
    }
`

const Adicionar = styled.button`
    margin-top: 50px;
    width: 500px;
    height: 50px;
    font-size: 17px;
    background-color: #487494;
    color:white;
    border: none;
    border-radius: 5px;
    &:hover{
        cursor: pointer;
        filter: brightness(0.9);
        span{
            display: none
        }
    }
    &:hover:before{
        content: "Adicionar ao carrinho";
    }
`