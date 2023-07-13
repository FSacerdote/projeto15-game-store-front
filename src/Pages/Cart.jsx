import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import NavBar from '../Components/NavBar';

const handleSubmit = () => {

}

const Item = ({ setItemsQtde, itemId }) => {
    const [thisItemQtde, setThisItemQtde] = useState(1);

    const handleClick = (action) => {
        if (thisItemQtde === 0 && !action) return;

        setThisItemQtde(prev => prev + (action ? 1 : -1));
        setItemsQtde(prev => ({
            ...prev, [itemId]: {
                ...prev[itemId], qtde: prev[itemId].qtde + (action ? 1 : -1)
            }
        }));
    };

    return <ItemContainer>
        <img src="https://images.alphacoders.com/605/605592.png" alt="ph" />
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
    const [itemsQtde, setItemsQtde] = useState({
        "10": {
            banana: 2, qtde: 1, preco: 10,
        },
        "11": {
            banana: 20, qtde: 0, preco: 5,
        }
    });
    const [formData, setFormData] = useState({
        nome: "",
        cep: "",
        frete: "gratis",
    });

    const itemId = "10";
    return (
        <>
            <NavBar />
            <Container>
                <Item setItemsQtde={setItemsQtde} itemId={itemId}></Item>
                <form onSubmit={handleSubmit} onChange={ev => setFormData(prev => ({
                    ...prev, [ev.target.name]: ev.target.value
                }))}>
                    <label htmlFor="nome">Nome completo:</label>
                    <input type="text" id="nome" name="nome" />
                    <label htmlFor="cep">CEP:</label>
                    <input type="text" id="cep" name="cep" />
                    <label htmlFor="frete">Frete</label>
                    <select name="frete" id="frete">
                        <option value="gratis">Gratis (5 dias)</option>
                        <option value="sedex">Sedex (2 dias)</option>
                    </select>
                    <button>Finalizar pedido</button>
                    <h3 name="total">Total: {Object.keys(itemsQtde).reduce(
                        (acc, curr) => itemsQtde[curr].qtde * itemsQtde[curr].preco + acc, 0
                    )}</h3>
                </form>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vw;
    padding-top: 120px;
    background-color: #375971ff;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 40px;

    img {
        width: 250px;
        height: auto;

        border-radius: 40px;
        border: 0.5px solid #ff61c6ff;
        box-shadow: 2px 2px 1px #ff61c6ff;

        &:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    }

    input, select {
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

        select {
            /* color: white; */
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
    }
`;

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 50px;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;

        button {
            width: 50px;
        }

        h3 {
            width: 30px;
            height: 20px;
            border-radius: 50%;
            padding: 10px;
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