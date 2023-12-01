import mongoose, {Schema} from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    picture: {
        type: String,
        require: true,
        trim: true
    },
    role: {
        ref: "Role",
        type: Schema.Types.ObjectId,
    },
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "custome"
    }
})

export default mongoose.model('user', UserSchema);