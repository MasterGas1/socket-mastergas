import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    description: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    image: {
        type: String,
        trim: true,
        default: 'https://cdn0.iconfinder.com/data/icons/cosmo-layout/40/box-512.png'
    },

    type: {
        type: String,
        enum: ['root', 'soon', 'end'],
        trim: true,
        required: true
    },

    price: {
        type: Number
    }
})

export default mongoose.model('service',ServiceSchema);