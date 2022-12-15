const mongoose = require('mongoose')
const User = require('../model/user_model')
const path = require('path');
const bcrypt = require('bcrypt');
const password = "fullstack" // salainen salasana

const url = `mongodb+srv://henkka:${password}@cluster0.whwvjso.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const useri = new User({
            userid: Math.floor(Math.random() * 1000000000),
            username: user,
            password: hashedPwd
            
          })
        useri.save().then(result => {
            console.log('tallenettu tietokantaan!')
            mongoose.connection.close()
          })
        res.status(201).json({ 'success': `New user ${useri.username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };