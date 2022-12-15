import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import "./Login.css";
import { Link, useNavigate, unstable_HistoryRouter } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const ValidateForm = () => {
        return email.length > 0 && password.length > 0;
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        let user = email;
        let pwd = password;
        let res;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, pwd })
        };
        await fetch('http://localhost:3500/auth', requestOptions)
            .then(response => response.json()).then((data) => {
                let str = data.success;
                console.log(str);
                res = str.substring(str.indexOf("=") + 1);
                console.log(res);
                Navigate(res);
                return (
                    res
                )
            });
    }

    const Navigate = (data) => {
        if (!data) {
            window.alert("Käyttäjänimi tai salasana väärä")
        } else {
            //console.log(HandleSubmit);
            localStorage.setItem("id", data);
            navigate("/todo", {state: {id: data}});
        }
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