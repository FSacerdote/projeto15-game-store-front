import { styled } from "styled-components"
import { useContext, useEffect, useState } from "react"
import NavBar from "../Components/NavBar"
import axios from "axios"
import Produto from "../Components/Produto"
import { useNavigate } from "react-router"
import { UserContext } from "../Components/UserContext"

export default function SuaLoja(){

    const [games, setGames] = useState([])
    const navigate = useNavigate()
    const {token} = useContext(UserContext)

    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
        axios.get(`${import.meta.env.VITE_API_URL}/games`)
            .then((resposta)=>{
                setGames(resposta.data.games)
            })
            .catch((erro)=>console.log(erro.message))
    }, [])
    
    return(
        <Loja>
            <NavBar/>
            <Corpo>
                <Topo>
                    <h1>Seus jogos</h1>
                    <button onClick={()=> navigate("/novo-jogo")}>+</button>
                </Topo>
                <GamesContainer>
                    {games.map((game)=><Produto key={game._id} game={game}/>)}
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