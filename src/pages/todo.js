import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const Todo = (route) => {

    const [note, setNote] = useState("");
    const [notesArr, setNotesArr] = useState([]);
    const [cehckArr, setCheckArr] = useState([]);

    useEffect(() => {
        FetchData();
    }, []);
    /*const {state} = useLocation();
    const {id} = state || 1;
    console.log(id);*/

    let id = localStorage.getItem("id")
    console.log(id);

    const FetchData = async (event) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        await fetch('http://localhost:3500/notes/' + id, requestOptions)
            .then(response => response.json()).then((data) => {
                console.log(data);
                setNotesArr(data);
                console.log("notesArr" + notesArr);
            });
    }

    const HandleSubmit = (event) => {
        event.preventDefault();
        let userid = id;
        let content = note;
        let done = false;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userid, content, done })
        };
        fetch('http://localhost:3500/notes', requestOptions)
            .then(response => response.json())
        FetchData();
    }

    const ClickHandler = (event) => {
        event.preventDefault();
        let id = event.target.id
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id})
        };
        fetch('http://localhost:3500/notes', requestOptions)
            .then(response => response.json())
        FetchData();
    }

    return (
        <>
            <div className="titleWrapper">
                <h1 className="title">To do</h1>
            </div>
            <div className="todo">
                <>
                    <div className="item">
                        {notesArr.map(({ content, done, _id }) =>
                            <>
                                <Button className="checkbox" id={_id} onClick={ClickHandler}>Delete</Button>
                                <label for={content} className="label">{content}</label>
                                <br />
                            </>)}
                    </div>
                </>
            </div>
            <div className="addNote">
                <Form className="addForm" onSubmit={HandleSubmit}>
                    <h2>Add note</h2>
                    <Form.Group>
                        <Form.Label>Note</Form.Label>
                        <Form.Control autoFocus value={note} onChange={(e) => setNote(e.target.value)} />
                    </Form.Group>
                    <Button className="submitBtn" block size="Ig" type="submit" onClick={FetchData}>Add</Button>
                </Form>
            </div>
        </>
    );
}

export default Todo;