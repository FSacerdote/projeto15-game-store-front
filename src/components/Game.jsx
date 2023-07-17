import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"

export default function Game(props) {

    const navigate = useNavigate();
    const { game } = props;

    const addToCart = game => {

    }
    return (
        <GameContainer>
            <Banner onClick={() => navigate(`/game/${game._id}`)}>
                <img src={game.capa} alt="" />
                <Titulo>{game.titulo}</Titulo>
            </Banner>
            <Footer>
                <Carrinho onClick={() => addToCart(game)}>
                    <span>R$ {game.valor}</span>
                </Carrinho>
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
const Carrinho = styled.button`
    width: 130px;
    height: 30px;
    background-color: white;
    border-radius: 3px;
    border: none;
    color: #0a0c37ff;
    font-size: 17px;
    &:hover{
        cursor: pointer;
        filter: brightness(0.9);
        span{
            display: none
        }
    }
    &:hover:before{
        content: "Adicionar";
    }
`

const Titulo = styled.p`
    margin-top: 15px;
    color: white;
`

const Footer = styled.div`
    display: flex;
`

const Banner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`