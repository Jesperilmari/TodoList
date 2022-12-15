const mongoose = require('mongoose')
const password = "fullstack" // salainen salasana

const url = `mongodb+srv://henkka:${password}@cluster0.whwvjso.mongodb.net/?retryWrites=true&w=majority`
const data = {
    Notes: require('../model/list.json'),
    setNotes: function (data) { this.Notes = data }
}


const noteSchema = new mongoose.Schema({
    userid:Number,
    content: String,
    done : Boolean,
   
})

const Note = mongoose.model('Note', noteSchema)

const getAllNotes = (req, res) => {
    mongoose.connect(url)
    Note.find({}).then(result => {
        test=result
        res.json(result);
        mongoose.connection.close()
      })
    
}
const createNewNote = (req, res) => {
    mongoose.connect(url)
    const newNote = {
        id: data.Notes?.length ? data.Notes[data.Notes.length - 1].id + 1 : 1,
        content: req.body.content,
        done : req.body.done
    }

    if (!newNote.content || !newNote.done) {
        return res.status(400).json({ 'message': 'data missing check request' });
    }
    const notee = new Note({
        userid:req.body.userid,
        content: req.body.content,
        done : req.body.done
    })
    
    notee.save().then(result => {
      console.log('note saved!')
      //mongoose.connection.close()
    })

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
    mongoose.connect(url)
    let yeet
   Note.find({}).then(result => {
    console.log(result[2].userid)
    yeet = result.filter(emp => emp.userid === parseInt(req.params.id))
    if (!yeet) {
        return res.status(400).json({ "message": `Note ID ${req.params.id} not found` });
    }
    res.json(yeet);
   // mongoose.connection.close()
    
  })

}

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote,
    getNote
}