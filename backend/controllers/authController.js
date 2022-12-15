const mongoose = require('mongoose')
const User = require('../model/user_model')

const bcrypt = require('bcrypt');
const password = "fullstack" // salainen salasana

const url = `mongodb+srv://henkka:${password}@cluster0.whwvjso.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)


const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    let foundUser;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
   await User.find({}).then(result => {
        console.log("tietokannasta löytyi käyttäjä")
         foundUser = result.find(person => person.username === user);
         console.log(foundUser)
        
      })
    //const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) {
        console.log("ei löydy käyttäjää")
        return res.sendStatus(401);} //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // create JWTs
        res.json({ 'success': `User ${user} with  is logged in! id=${foundUser.userid}` });
    } else {
        console.log("salasana ei matchaa")
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };