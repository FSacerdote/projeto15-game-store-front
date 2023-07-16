import axios from "axios";
import { useState } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom"
import NavBar from "../components/NavBar.jsx";

export default function SignUpPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function submitForm(e) {
        e.preventDefault();

        if (form.password !== form.confirmPassword)
            return alert("As senhas não coincidem!");

        delete form.confirmPassword;
        axios.post(`${process.env.VITE_URL}/cadastro`, form)
            .then(res => console.log(res.response.data))
            .catch(err => console.log(err))
    }

    return (
        <>
            <NavBar />
            <Container>
                <form onSubmit={submitForm}>
                    <input
                        required
                        placeholder="Nome"
                        type="name"
                        name="name"
                        onChange={handleForm}
                    />
                    <input
                        required
                        placeholder="E-mail"
                        type="email"
                        autoComplete="username"
                        name="email"
                        onChange={handleForm}
                    />
                    <input
                        required
                        minLength={3}
                        placeholder="Senha"
                        type="password"
                        autoComplete="new-password"
                        name="password"
                        onChange={handleForm}
                    />
                    <input
                        required
                        placeholder="Confirme a senha"
                        type="password"
                        autoComplete="new-password"
                        name="confirmPassword"
                        onChange={handleForm}
                    />
                    <FileLabel htmlFor="fileUpload">
                        Selecione uma imagem
                        <FileInput
                            id="fileUpload"
                            required
                            type="file"
                            name="image"
                            // onChange={handleImageUpload}
                            accept="image/*"
                        />
                    </FileLabel>
                    <button type="submit">Cadastrar</button>
                </form>

                <Link to="/login">
                    Já possui conta? Faça o login!
                </Link>
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

    ::placeholder {
        font-size: 1.25rem;
        color: #fff;
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
    }
`;

const FileLabel = styled.label`
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
`;

const FileInput = styled.input`
    display: none;
`;