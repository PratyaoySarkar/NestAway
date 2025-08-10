const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Places = require('./DBModels/Places');
const User = require('./DBModels/User'); // Import UserModel
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Booking = require('./DBModels/Bookings'); // Import BookingModel
require('dotenv').config(); // Load environment variables from .env file

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());//To parse JSON bodies
app.use(cookieParser()); // To parse cookies
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
const port = process.env.PORT || 4000;

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");
    app.listen(port);
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

const uploadMiddleware = multer({ dest: 'uploads/' }); // Set the destination for uploaded files
app.post('/upload', uploadMiddleware.array('photos', 100), (req, res) =>{
    const upLoadedFiles = [];
    for(let i=0; i<req.files.length; i++){
        const { path: tempPath, originalname } = req.files[i];
        const ext = originalname.split('.').pop();
        const newPath = tempPath + '.' + ext;
        fs.renameSync(tempPath, newPath);
        upLoadedFiles.push(path.basename(newPath)); 
    }
    res.json(upLoadedFiles);
})

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, description,  
        perks, addedPhotos, extraInfo, 
        checkIn, checkOut, guests, price } = req.body
    if(token){
        jwt.verify(token, process.env.USER_SECRET, {}, async (err, user) =>{
            if(err) throw err;
            const placeDoc = await Places.create({
                owner: user.id,
                title, address, description,  
                perks, photos:addedPhotos, extraInfo, 
                checkIn, checkOut, maxGuests: guests, price
            });
            res.json(placeDoc);
        })
    }else{
        return res.status(401).json({message: 'No token provided'});
    }
})

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, process.env.USER_SECRET, {}, async (err, user) =>{
            if(err) throw err;
            const { id } = user;
            res.json(await Places.find({owner: id}))
        })
    }else{
        return res.status(401).json({message: 'No token provided'});
    }
})

app.get('/places/:id', async (req, res) =>{
    const {id} =  req.params;
    res.json(await Places.findById(id));
} )

app.put('/places', async(req, res) =>{
    const { token } = req.cookies;
    const { id, title, address, description,  
        perks, addedPhotos, extraInfo, 
        checkIn, checkOut, guests, price } = req.body;
    if(token){
        jwt.verify(token, process.env.USER_SECRET, {}, async (err, user) =>{
            if(err) throw err;
            const placeDoc = await Places.findById(id);
            if(user.id === placeDoc.owner.toString()){
                placeDoc.set({
                    title, address, description,  
                    perks, photos:addedPhotos, extraInfo, 
                    checkIn, checkOut, maxGuests: guests, price
                });
                await placeDoc.save();
                res.json('ok');
            }
        })
    }else{
        return res.status(401).json({message: 'No token provided'});
    }
    
})

app.get('/places', async (req, res) =>{
    res.json(await Places.find());
})

app.post('/bookings', async (req, res) => {
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, process.env.USER_SECRET, {}, async (err, user) =>{
            if(err) throw err;
            const userData = user; 
            const { checkIn, checkOut, numOfGuests, place, name, phone, price } = req.body;
            Booking.create({
                user: userData.id,
                checkIn, checkOut, numOfGuests, place, name, phone, price
            }).then((doc) => {
                res.json(doc);
            }).catch((err) => { 
                throw err;
            })
        })
    }
    
});

app.get('/bookings', async(req, res) => {
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, process.env.USER_SECRET, {}, async (err, user) =>{
            if(err) throw err;
            const userData = user;
            res.json(await Booking.find({user: userData.id}).populate('place')); 
        })
    }
})

//app.listen(4000);