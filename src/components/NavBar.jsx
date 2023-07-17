import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import homeIcon from '../assets/home-outline.svg';
import authIcon from '../assets/person-add-outline.svg';
import cartIcon from '../assets/cart-outline.svg';
import storeIcon from '../assets/storefront-outline.svg';

const NavBar = () => {
    const [scrollDiff, setScrollDiff] = useState({
        prev: window.scrollY,
        curr: window.scrollY,
    });

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const handleScroll = () => {
        setScrollDiff(prevState => ({
            prev: prevState.curr,
            curr: window.scrollY,
        }));
    };

    return (
        <Container
            scrolldiff={scrollDiff}
        >
            <Link to="/sualoja">
                <img src={storeIcon} alt="icon" />Sua Loja</Link>
            <Link to="/">
                <img src={homeIcon} alt="icon" />Home</Link>
            <input type="text"
                onChange={ev => findRelatedItems(ev)} />
            <Link id="cart" to="/carrinho">
                <img src={cartIcon} alt="icon" />Carrinho</Link>
            <Link to="/login">
                <img src={authIcon} alt="icon" />Login/Cadastro</Link>
        </Container>
    )
}

const Container = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0 auto;
    padding: 20px 30px;
    width: 90%;
    height: 60px;

    position: fixed;
    top: 10px;
    left: 0;
    right: 0;

    background-color: #0a0c37ff;
    border-radius: 15px;
    box-shadow: 2px 2px 1px #ff61c6ff;

    transform: ${({ scrolldiff }) => `translateY(${scrolldiff.curr - scrolldiff.prev > 0 ? '-200px' : '0px'})`};
    a {
        text-decoration: none;
        color: #ff61c6ff;

         &:hover {
            scale: 1.02;
            cursor: pointer;
            color: #5cecffff;
            opacity: 0.6;
        }

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    input {
        width: 250px;
        height: 30px;
        border-radius: 5px;
        border: 0.5px solid #ff61c6ff;
        box-shadow: 2px 2px 1px #ff61c6ff;

        &:hover {
            scale: 1.02;
            cursor: pointer;
            transform: translateX(-1px);
        }
    }

    img {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        background-color: #FFF;
        border-radius: 50%;
        padding: 5px;
    }
`;

export default NavBar;