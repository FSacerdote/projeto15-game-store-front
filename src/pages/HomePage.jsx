import { styled } from "styled-components"
import Game from "../components/Game"
import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import axios from "axios"

export default function HomePage() {

    const [games, setGames] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/games`)
            .then((resposta) => {
                setGames(resposta.data.games)
            })
            .catch((erro) => console.log(erro.message))
    }, [])

    return (
        <Home>
            <NavBar />
            <Corpo>
                <Topo>
                    {games.length !== 0 ? <h1>Jogos Disponíveis</h1> : <h1>Nenhum jogo disponível no momento</h1>}
                </Topo>
                <GamesContainer>
                    {games.map((game) => <Game key={game._id} game={game} />)}
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
    background-color: #375971ff;
`
const Corpo = styled.div`
    margin-top: 70px;
    padding-top: 10px;
    width: 90%;
`

const Topo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1{
        margin-bottom: 10px;
        font-size: 20px;
    }
`

const GamesContainer = styled.div`
    display: flex;
    gap: 20px;
`