import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import NavBar from '../components/NavBar';
import { ItemsContext } from '../context/ItemsContext';
import { UserContext } from '../context/UserAuthContext';
import finishOrder from '../services/finishOrder';
import rightArrow from '../assets/caret-forward-outline.svg';

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
            ], total: prev.total + (action ? 1 : -1) * itemPrice >= 0
                ? prev.total + (action ? 1 : -1) * itemPrice
                : 0,
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
    const { userData } = useContext(UserContext);
    const [formData, setFormData] = useState({
        comprador: "",
        cep: "",
        email: "",
        frete: "gratis",
    });
    const [requestStatus, setRequestStatus] = useState(false);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const itemsToSend = selectedItems.items.filter(item => item.itemQtde > 0);
        const reqBody = { ...formData };
        const token = userData.token;
        if (userData.token.length > 0) {
            reqBody.comprador = userData.userInfo.userId;
        }

        const request = finishOrder(reqBody, itemsToSend, token);

        setRequestStatus(true);
        setTimeout(() => {
            setRequestStatus(false);
        }, 3000);
    };

    return (
        <>
            <NavBar />
            {/* <ReqStatus></ReqStatus> */}
            <Container>
                {
                    !!selectedItems.items.find(item => item.itemQtde > 0) ?
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            gap: "40px",
                            width: "50%",
                            height: "300px",
                            overflowX: "hidden",
                        }}>
                            {selectedItems.items.map(item => item.itemQtde > 0 &&
                                <Item key={item.itemId} item={item} setSelectedItems={setSelectedItems} />)}

                        </div>
                        : <h1>Seu carrinho está vazio... <br /><Link style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                            to="/">Confira os jogos disponíveis no catálogo!
                            <img
                                src={rightArrow}
                                alt="right arrow"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "none",
                                    boxShadow: "none"
                                }}
                            />
                        </Link></h1>
                }
                <form onSubmit={ev => handleSubmit(ev)} onChange={ev => setFormData(prev => ({
                    ...prev, [ev.target.name]: ev.target.value
                }))}>
                    <label htmlFor="comprador">Nome completo:</label>
                    <input type="text" id="comprador" name="comprador" />

                    <label htmlFor="cep">CEP:</label>
                    <input type="text" id="cep" name="cep" />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />

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
            </Container >
        </>
    )
}

const Container = styled.div`
    width: 90%;
    height: 100%;
    padding: 150px 30px 50px;
    margin: auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    overflow-x: hidden;

    img {
        max-width: 250px;
        height: auto;
        min-height: 50px;
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

        width: 50%;
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
    justify-content: center;
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