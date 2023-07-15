import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

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
            <Link to="/sualoja">Sua Loja</Link>
            <Link>Categorias</Link>
            <input type="text" />
            <Link>Login/Cadastro</Link>
            <Link id="cart" to="/carrinho">Carrinho</Link>
        </Container>
    )
}

const Container = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0 auto;
    padding: 10px 30px;
    width: 85%;
    height: 40px;

    position: fixed;
    top: 20px;
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
    }

    input {
        height: 20px;
        border-radius: 5px;
        border: 0.5px solid #ff61c6ff;
        box-shadow: 2px 2px 1px #ff61c6ff;

        &:hover {
            scale: 1.02;
            cursor: pointer;
            transform: translateX(-1px);
        }
    }
`;

export default NavBar;