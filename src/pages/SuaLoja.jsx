import { styled } from "styled-components"
import Game from "../components/Game"
import { useContext, useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import axios from "axios"
import Produto from "../components/Produto"
import { useNavigate } from "react-router"
import { UserContext } from "../context/UserAuthContext"
import { Link } from "react-router-dom"

export default function SuaLoja() {

    const [games, setGames] = useState([])
    const navigate = useNavigate()
    const { userData: { token } } = useContext(UserContext)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        if (!token.length) {
            navigate("/login");
            return;
        }

        axios.get(`${import.meta.env.VITE_API_URL}/meusjogos`, config)
            .then((resposta) => {
                console.log(resposta);
                if (resposta.data.length > 0) {
                    setGames(resposta.data);
                }
            })
            .catch((erro) => console.log(erro.message));
    }, [])

    return (
        <Loja>
            <NavBar />
            <Corpo>
                <Topo>
                    <h1>Seus jogos</h1>
                    <button onClick={() => navigate("/novo-jogo")}>+</button>
                </Topo>
                <GamesContainer>
                    {games.length > 0
                        ? games.map((game) => <Produto key={game._id} game={game} />)
                        : <Link>
                            "Nenhum jogo por aqui... Adicione o seu primeiro jogo na loja."
                        </Link>
                    }
                </GamesContainer>
            </Corpo>
        </Loja>
    )
}

const Loja = styled.div`
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