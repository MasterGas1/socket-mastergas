import mongoose from 'mongoose';

const TypeServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})

export default mongoose.model('type-service', TypeServiceSchema);