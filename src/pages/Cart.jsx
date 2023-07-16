import { useState, useContext } from 'react';
import { styled } from 'styled-components';

import NavBar from '../components/NavBar';
import { ItemsContext } from '../context/ItemsContext';
import { Link } from 'react-router-dom';
import finishOrder from '../services/finishOrder';

const Item = ({ item: { itemId, itemName, itemPrice, itemImgUrl, itemQtde },
    setSelectedItems }) => {
    const [thisItemQtde, setThisItemQtde] = useState(itemQtde);
    const handleClick = (action) => {
        if (thisItemQtde === 0 && !action) return;

        setThisItemQtde(prev => prev + (action ? 1 : -1));
        setSelectedItems(prev => ({
            items: [...prev.items
                .map(item => item.itemId === itemId
                    ? { ...item, itemQtde: item.itemQtde + (action ? 1 : -1) }
                    : { ...item })
            ], total: prev.total + (action ? 1 : -1) * itemPrice,
        }))
    };

    return <ItemContainer>
        <img src={itemImgUrl} alt={itemName} />
        <div>
            <h2>{itemName}</h2>
            <h2>R$ {Number(itemPrice).toFixed(2)}</h2>
        </div>
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>
            <button onClick={() => handleClick(true)}>+</button>
            <h3>{thisItemQtde}</h3>
            <button onClick={() => handleClick(false)}>-</button>
        </div>
    </ItemContainer>
}

const Cart = () => {
    const { selectedItems, setSelectedItems } = useContext(ItemsContext);
    const [formData, setFormData] = useState({
        nome: "",
        cep: "",
        frete: "gratis",
    });

    const handleSubmit = (ev) => {
        ev.preventDefault();

        finishOrder(formData, selectedItems);
    };

    return (
        <>
            <NavBar />
            <Container>
                {
                    selectedItems.items.length > 0 ?
                        <div style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            gap: "60px",
                            overflowX: "scroll",
                            width: "80%",
                            padding: "30px"
                        }}>
                            {selectedItems.items.map(item =>
                                <Item key={item.itemId} item={item} setSelectedItems={setSelectedItems} />)}

                        </div>
                        : <h1>Seu carrinho está vazio... <br /><Link to="/">Confira os jogos disponíveis no catálogo!</Link></h1>
                }
                <form onSubmit={ev => handleSubmit(ev)} onChange={ev => setFormData(prev => ({
                    ...prev, [ev.target.name]: ev.target.value
                }))}>
                    <label htmlFor="nome">Nome completo:</label>
                    <input type="text" id="nome" name="nome" />

                    <label htmlFor="cep">CEP:</label>
                    <input type="text" id="cep" name="cep" />
                    <div>
                        <input type="radio" value="gratis" id="gratis" name="frete" />
                        <label htmlFor="gratis">Gratis (7 dias)</label>
                    </div>
                    <div>
                        <input type="radio" value="sedex" id="sedex" name="frete" />
                        <label htmlFor="sedex">Sedex R$ 15,00 (3 dias)</label>
                    </div>

                    <button>Finalizar pedido</button>
                    <h3 name="total">Total: {selectedItems.total}</h3>
                </form>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 120px;
    background-color: #375971ff;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 40px;
    overflow-x: hidden;

    img {
        max-width: 250px;
        height: auto;
        background-color: transparent;

        border-radius: 40px;
        border: 0.5px solid #ff61c6ff;
        box-shadow: 2px 2px 1px #ff61c6ff;

        &:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    }

    input {
            color: #fff;
            font-size: 1.25rem;
            line-height: 1;
            border-style: none;
            outline: none;
            // height calc line-height + (vertical-padding * 2) + (vertical-border * 2)
            height: 5px;
            width: 200px;
            padding: 0.8em 1em;
            border: 0.1em solid transparent;
            background-image: linear-gradient(#000, #000),
            linear-gradient(120deg, #f09 0%, #0ff 50%, #9f0 100%);
            background-origin: border-box;
            background-clip: padding-box, border-box;
            border-radius: 1.8em;
            background-size: 200% 100%;
            transition: background-position 0.8s ease-out;

            &:hover {
                background-position: 100% 0;
            }

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }

        button {
            height: 35px;
            color: #ff61c6ff;
            font-weight: 600;
            border-radius: 5px;
            border: 0.5px solid #ff61c6ff;
            box-shadow: 2px 2px 1px #ff61c6ff;
            background-color: #0a0c37ff;

            &:hover {
                scale: 1.02;
                cursor: pointer;
                transform: translateX(-1px);
            }
        }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;

        width: 70%;
        padding: 20px 0px;

        color: #fff;
        border: 0.1em solid transparent;
        background-image: linear-gradient(#000, #000),
        linear-gradient(120deg, #f09 0%, #0ff 50%, #9f0 100%);
        background-origin: border-box;
        background-clip: padding-box, border-box;
        border-radius: 1.8em;
        background-size: 200% 100%;
        transition: background-position 0.8s ease-out;

        button {
            margin-top: 20px;
        }

        div {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 10px;
        }

        #gratis, #sedex {
            width: 20px;
            height: 20px;
        }

        h3 {
            margin-top: 5px;
        }
    }
`;

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 20px;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;


        h2 {
            &:nth-child(1) {
                font-weight: 700;
            }

            margin: -5px;
            color: #ff61c6ff;
        }

        button {
            width: 50px;
        }

        h3 {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            padding: 10px 5px 25px;
            margin: -3px 0;
            text-align: center;
            color: #FFF;

            border: 0.5px solid #ff61c6ff;
            box-shadow: 2px 2px 1px #ff61c6ff;
            background-color: #0a0c37ff;
        }
    }
`;

export default Cart;