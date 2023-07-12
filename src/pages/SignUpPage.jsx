import { Link } from "react-router-dom"
import styled from "styled-components"

export default function SignUpPage() {
    return (
        <SingUpContainer>
            <form>
                <input placeholder="Nome" type="text" />
                <input placeholder="E-mail" type="email" />
                <input placeholder="Senha" type="password" autocomplete="new-password" />
                <input placeholder="Confirme a senha" type="password" autocomplete="new-password" />
                <button>Cadastrar</button>
            </form>

            <Link to="/login">
                Já tem uma conta? Entre agora!
            </Link>
        </SingUpContainer>
    )
}

const SingUpContainer = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
