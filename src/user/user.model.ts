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
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    picture: {
        type: String,
        default: "https://res.cloudinary.com/dnesdnfxy/image/upload/v1700172676/mastergas23/users/nrtsecwphzvysmcddswx.png",
        trim: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ["pedding","approved","denied"]
    },
    role_id: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Role"
    },
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "customer"
    }
})

export default mongoose.model('user', UserSchema);