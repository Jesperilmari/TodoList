import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const ValidateForm = () => {
        return email.length > 0 && password.length > 0;
    }

    const HandleSubmit = (event) => {
        event.preventDefault();
        let user = email;
        let pwd = password;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user, pwd})
        };
        fetch('http://localhost:3500/auth', requestOptions)
            .then(response => response.json())
    }

    return (
        <>
        <div className="Login">
            <Form onSubmit={HandleSubmit}>
            <h1>Sign in</h1>
                <Form.Group size="Ig" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group size="Ig" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Link to="/register">Click here to sing up!</Link>
                <br></br>
                <Button className="submitBtn" block size="Ig" type="submit" disabled={!ValidateForm()}>Login</Button>
            </Form>
        </div >
        </>
    );
}

export default Login;