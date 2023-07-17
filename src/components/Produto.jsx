import { styled } from "styled-components"
import { useNavigate} from "react-router-dom"
import { UserContext } from "../context/UserAuthContext"
import axios from "axios"
import { useContext } from "react"

export default function Produto({game}){

    const navigate = useNavigate()
    const { userData: user } = useContext(UserContext)
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

    function deleteGame(){
        if(!confirm("Tem certeza que deseja deletar este produto?")) return
        axios.delete(`${import.meta.env.VITE_API_URL}/delete/${game._id}`, config)
            .then(()=>{
                return navigate("/")
            })
            .catch((error)=>console.log(error.response))
    }

    return(
        <GameContainer>
            <Banner>
                <img src={game.capa} alt="" />
                <Titulo>{game.titulo}</Titulo>
            </Banner>
            <Footer>
                <Editar>
                    <span onClick={()=>navigate(`/editar/${game._id}`)}>Editar</span>
                </Editar>
                <Deletar onClick={deleteGame}>
                    <span>X</span>
                </Deletar>
            </Footer>
        </GameContainer>
    )
}

const GameContainer = styled.div`
    padding-bottom: 10px;
    width: 150px;
    height: 170px;
    background-color: #0a0c37ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 3px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.10);
    img{
        width: 150px;
        height: 80px;
    }
`
const Editar = styled.button`
    width: 70px;
    height: 30px;
    background-color: white;
    border-radius: 3px;
    border: none;
    color: #0a0c37ff;
    font-size: 17px;
    &:hover{
        cursor: pointer;
        filter: brightness(0.9);
    }
`

const Deletar = styled.button`
    width: 30px;    
    height: 30px;
    background-color: #830000;
    border-radius: 3px;
    border: none;
    color: white;
    font-size: 17px;
    &:hover{
        cursor: pointer;
        filter: brightness(0.9);
    }
    span{
        font-weight: bold;
    }
`

const Titulo = styled.p`
    margin-top: 15px;
    color: white;
`

const Footer = styled.div`
    display: flex;
    gap: 10px;
`

const Banner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`