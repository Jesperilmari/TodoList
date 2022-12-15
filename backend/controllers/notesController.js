const mongoose = require('mongoose')
const password = "fullstack" // salainen salasana

const url = `mongodb+srv://henkka:${password}@cluster0.whwvjso.mongodb.net/?retryWrites=true&w=majority`

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
      })
    
}
const createNewNote = (req, res) => {
    mongoose.connect(url)
    const notee = new Note({
        userid:req.body.userid,
        content: req.body.content,
        done : req.body.done
    })
    if (!notee.content || !notee.done) {
        return res.status(400).json({ 'message': 'data missing check request' });
    }

    
    notee.save().then(result => {
      console.log('note saved!')
      //mongoose.connection.close()
    })

    res.status(201).json(notee);
}

const updateNote = (req, res) => {
}


const deleteNote = (req, res) => {
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
    getNote,
    updateNote,
    deleteNote
    
}