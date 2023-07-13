import { styled } from "styled-components"
import Game from "../components/Game"
import { useEffect, useState } from "react"
import NavBar from "../Components/NavBar"
import axios from "axios"

export default function HomePage(){

    const [games, setGames] = useState([])

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/games`)
            .then((resposta)=>{
                setGames(resposta.data.games)
            })
            .catch((erro)=>console.log(erro))
    }, [])
    
    return(
        <Home>
            <NavBar/>
            <Corpo>
                <Topo>
                    <h1>Jogos Disponíveis</h1>
                    <button>+</button>
                </Topo>
                <GamesContainer>
                    {games.map((game)=><Game/>)}
                </GamesContainer>
            </Corpo>
        </Home>
    )
}

const Home = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width:100%;
`
const Corpo = styled.div`
    margin-top: 70px;
    padding-top: 10px;
    width: 1250px;
`

const Topo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    button{
        font-size: 20px;
        border-radius: 3px;
        border: none;
        width: 30px;
        height: 30px;
        background-color: #0a0c37ff;
        color: white;
        &:hover{
            cursor: pointer;
        }
    }
    h1{
        margin-bottom: 10px;
        font-size: 20px;
    }
`

const GamesContainer = styled.div`
    display: flex;
    gap: 20px;
`

const Header = styled.div`
    width: 100%;
    height: 80px;
    background-color: black;
`