import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Todo = () => {

    const [note, setNote] = useState("");

    const TodoItems = () => {
        return (
            <form className="item">
                <input className="checkbox" type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                <label for="vehicle1" className="label"> I have a bike</label>
                <br/>
                <input className="checkbox" type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                <label for="vehicle1" className="label"> I have a bike</label>
                <br/>
                
            </form>

        )
    }

    const HandleSubmit = () => {

    }

    return (
        <>
            <h1 className="title">To do</h1>
            <div className="todo">
                <TodoItems />
            </div>
            <div className="addNote">
            <Form onSubmit={HandleSubmit}>
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