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
    origin: 'https://nestawayhotels.onrender.com', //Updated frontend URL
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

function authMiddleware(req, res, next) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.USER_SECRET, {}, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

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
            res.cookie('token',token, {
                httpOnly: true,
                secure: true,        // required for HTTPS
                sameSite: 'none'  
            }).json(userDoc);
        })
    }else{
        res.status(401).json({message: 'Wrong credentials'});
    }
});

app.get('/profile', authMiddleware, async (req, res) => {
    const {name, email, _id} = await User.findById(req.user.id);
    res.json({name, email, _id});
});

app.post('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(0) // Expire immediately
    }).json({ message: 'Logged out' });
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

app.post('/places', authMiddleware, async (req, res) => {
    const { title, address, description,  
        perks, addedPhotos, extraInfo, 
        checkIn, checkOut, guests, price } = req.body;
    
    const placeDoc = await Places.create({
        owner: req.user.id,
        title, address, description,  
        perks, photos:addedPhotos, extraInfo, 
        checkIn, checkOut, maxGuests: guests, price
    });
})

app.get('/user-places', authMiddleware, async (req, res) => {
    const { id } = req.user;
    res.json(await Places.find({ owner: id }));
})

app.get('/places/:id', async (req, res) =>{
    const {id} =  req.params;
    res.json(await Places.findById(id));
} )

app.put('/places', authMiddleware, async(req, res) =>{
    const { id, title, address, description,  
        perks, addedPhotos, extraInfo, 
        checkIn, checkOut, guests, price } = req.body;
    const placeDoc = await Places.findById(id);
    if (req.user.id === placeDoc.owner.toString()) {
        placeDoc.set({
            title, 
            address, 
            description,  
            perks, 
            photos: addedPhotos, 
            extraInfo, 
            checkIn, 
            checkOut, 
            maxGuests: guests, 
            price
        });
        await placeDoc.save();
        res.json('ok');
    } else {
        res.status(403).json({ message: 'You are not the owner of this place' });
    }
})

app.get('/places', async (req, res) =>{
    res.json(await Places.find());
})

app.post('/bookings', authMiddleware, async (req, res) => {
    const { checkIn, checkOut, numOfGuests, place, name, phone, price } = req.body;
    try {
        const bookingDoc = await Booking.create({
            user: req.user.id,
            checkIn, checkOut, numOfGuests, place, name, phone, price
        });
        res.json(bookingDoc);
    } catch (err) {
        // Handle any database errors
        res.status(500).json({ message: 'Failed to create booking', error: err.message });
    }
});

app.get('/bookings', authMiddleware, async(req, res) => {
    const { token } = req.cookies;
    try {
        const bookings = await Booking.find({user: req.user.id}).populate('place');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve bookings', error: err.message });
    }
})

//app.listen(4000);