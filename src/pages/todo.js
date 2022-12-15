import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Todo = (route) => {

    const [note, setNote] = useState("");

    /*const {state} = useLocation();
    const {id} = state || 1;
    console.log(id);*/

    let id = localStorage.getItem("id")
    console.log(id);
    
    const HandleChange = () => {
        
    }
    const fetchData = async (event)=>{
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        };
        await fetch('http://localhost:3500/notes', requestOptions)
        .then(response => response.json()).then((data) => {
                console.log(data);
        });
    }
    const TodoItems = () => {
        return (
            <>
                <div className="item">
                    <input className="checkbox" type="checkbox" id="vehicle1" name="vehicle1" value="Bike" onChange={HandleChange} />
                    <label for="vehicle1" className="label"> I have a bike</label>
                </div>
            </>
        )
    }

    const HandleSubmit = (event) => {
        event.preventDefault();
        let userid = id;
        let content = note;
        let done = false;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userid, content, done})
        };
        fetch('http://localhost:3500/notes', requestOptions)
            .then(response => response.json())
    }

    return (
        <>
            <div className="titleWrapper">
                <h1 className="title">To do</h1>
            </div>
            <div className="todo">
                <TodoItems />
            </div>
            <div className="addNote">
                <Form onSubmit={HandleSubmit} className="addForm">
                    <h2>Add note</h2>
                    <Form.Group>
                        <Form.Label>Note</Form.Label>
                        <Form.Control autoFocus value={note} onChange={(e) => setNote(e.target.value)} />
                    </Form.Group>
                    <Button className="submitBtn" block size="Ig" type="submit">Add</Button>
                </Form>
            </div>
        </>
    );
}

export default Todo;