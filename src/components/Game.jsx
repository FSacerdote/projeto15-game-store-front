import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { ItemsContext } from "../context/ItemsContext";

export default function Game(props) {
    const { selectedItems, setSelectedItems } = useContext(ItemsContext);
    const { game } = props;
    const [addedToCart, setAddedToCart] = useState(!!selectedItems.items.find(item =>
        item.itemId == game._id && item.itemQtde > 0));
    const navigate = useNavigate();

    const addToCart = () => {
        setAddedToCart(prev => !prev);

        const newGameObj = {
            itemId: game._id,
            itemName: game.titulo,
            itemImgUrl: game.capa,
            itemPrice: game.valor,
            itemQtde: 1,
        }

        const price = Number(game.valor.toString().replace(",", "."));
        setSelectedItems(prev => !addedToCart
            ? {
                items: [...prev.items, newGameObj],
                total: prev.total + price
            }
            : {
                items: [...prev.items].filter(item => item.itemId !== game._id),
                total: prev.total - price >= 0 ? prev.total - price : 0
            }
        )
    }
    return (
        <GameContainer>
            <Banner onClick={() => navigate(`/game/${game._id}`)}>
                <img src={game.capa} alt="" />
                <Titulo>{game.titulo}</Titulo>
            </Banner>
            <Footer>
                <Carrinho
                    style={{
                        backgroundColor: `${addedToCart
                            ? "#42f56f" : ""}`
                    }}
                    onClick={addToCart}
                    action={addedToCart ? "Remover" : "Adicionar"}>
                    <h5>{addedToCart ? "Remover" : "Adicionar"}</h5>
                    <span>{addedToCart ? "No carrinho" : "R$" + game.valor}</span>
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

    h5 {
        display: none;
    }

    &:hover{
        cursor: pointer;
        filter: brightness(0.9);
        span{
            display: none
        }
        h5 {
            display: block;
        }
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