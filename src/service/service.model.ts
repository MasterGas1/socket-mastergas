import mongoose from 'mongoose'
import mongoose_delete from 'mongoose-delete';

const ServiceSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        trim: true,
        default: 'https://cdn0.iconfinder.com/data/icons/cosmo-layout/40/box-512.png'
    },

    type: {
        type: String,
        enum: ['root service', 'subservice', 'price'],
        trim: true,
        required: true
    },

    fatherService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },

    subServices:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],

    price: {
        type: Number
    },
    available: {
        type: Boolean,
        default: true
    }
})

ServiceSchema.plugin(mongoose_delete, {overrideMethods: 'all'})

export default mongoose.model('Service',ServiceSchema);