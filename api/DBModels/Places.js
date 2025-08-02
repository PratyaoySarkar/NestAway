const mongoose = require('mongoose');
const placeSchema = new mongoose.Schema({
    owner: { type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    address: { type: String, required: true },
    photos: [{ type: String }],
    description: { type: String },
    perks: [{ type: String }],
    extraInfo: { type: String },
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
});

const PlaceModel = mongoose.model('Place', placeSchema);
module.exports = PlaceModel;
