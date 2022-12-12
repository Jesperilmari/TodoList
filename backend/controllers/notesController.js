const data = {
    Notes: require('../model/list.json'),
    setNotes: function (data) { this.Notes = data }
}

const getAllNotes = (req, res) => {
    res.json(data.Notes);
}

const createNewNote = (req, res) => {
    const newNote = {
        id: data.Notes?.length ? data.Notes[data.Notes.length - 1].id + 1 : 1,
        content: req.body.content,
        done : req.body.done
    }

    if (!newNote.content || !newNote.done) {
        return res.status(400).json({ 'message': 'data missing check request' });
    }
    console.log(newNote)
    data.setNotes([...data.Notes, newNote]);
    res.status(201).json(data.Notes);
}

const updateNote = (req, res) => {
    const Note = data.Notes.find(emp => emp.id === parseInt(req.body.id));
    if (!Note) {
        return res.status(400).json({ "message": `Note ID ${req.body.id} not found` });
    }
    if (req.body.content) Note.content = req.body.content;
    if (req.body.done) Note.done = req.body.done;
    const filteredArray = data.Notes.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, Note];
    data.setNotes(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.Notes);
}

const deleteNote = (req, res) => {
    const Note = data.Notes.find(emp => emp.id === parseInt(req.body.id));
    if (!Note) {
        return res.status(400).json({ "message": `Note ID ${req.body.id} not found` });
    }
    const filteredArray = data.Notes.filter(emp => emp.id !== parseInt(req.body.id));
    data.setNotes([...filteredArray]);
    res.json(data.Notes);
}

const getNote = (req, res) => {
    const Note = data.Notes.find(emp => emp.id === parseInt(req.params.id));
    if (!Note) {
        return res.status(400).json({ "message": `Note ID ${req.params.id} not found` });
    }
    res.json(Note);
}

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote,
    getNote
}