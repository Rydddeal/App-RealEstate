const mongoose = required('mongoose');

const PlaceSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    chechOut: Number,
    maxGuests: Number,
});


const PlaceModel = mongoose.model('Place', PlaceSchema);

export default PlaceSchema;
