const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./DBModels/User'); // Import UserModel
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config(); // Load environment variables from .env file

app.use(express.json());//To parse JSON bodies
app.use(cookieParser()); // To parse cookies
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");
    app.listen(4000);
    console.log("Server is running on port 4000");
}
connectDB();
//const userSecret = bcrypt.genSaltSync(10);

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    try{
        const userDoc = await User.create({
            name,
            email,
            password : hashPassword // Hash the password before saving using salting
        })
        res.json(userDoc);
    }catch (e) {
        res.status(400).json(e);
    } 
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email: email });
    if(!userDoc){
        return res.status(401).json({message :'User not found'});
    }

    const passOk = await bcrypt.compare(password, userDoc.password);
    if(passOk){
        jwt.sign({ email: userDoc.email, id: userDoc._id}, process.env.USER_SECRET, {}, (err, token)=>{
            if(err) throw err;
            res.cookie('token',token).json(userDoc);
        })
    }else{
        res.status(401).json({message: 'Wrong credentials'});
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, process.env.USER_SECRET, {}, async (err, user) =>{
            if(err) throw err;
            const {name, email, _id} = await User.findById(user.id);
            res.json({name, email, _id});
        })
    }else{
        return res.status(401).json({message: 'No token provided'});
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true); // Clear the token cookie
});

//app.listen(4000);