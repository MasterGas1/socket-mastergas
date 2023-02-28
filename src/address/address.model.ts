import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    addressName:{
        type: String,
        require: true,
        trim: true
    },
    coords: {
        latitude: {
            type: Number,
            require: true,
            trim: true
        },
        longitude: {
            type: Number,
            require: true,
            trim: true
        }
    }

})

export default mongoose.model('address', AddressSchema);