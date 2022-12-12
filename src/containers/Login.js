import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const ValidateForm = () => {
        return email.length > 0 && password.length > 0;
    }

    const HandleSubmit = () => {
        
    }

}

export default Login;