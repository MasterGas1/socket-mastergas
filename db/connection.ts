import mongoose from "mongoose";


const db = async() => {
    try{
       
        //Set strictquery in mongoose
        mongoose.set('strictQuery', true);

        //Connection databse
        await mongoose.connect(
            'mongodb://localhost:27017/masterGas23'
        )

        console.log('Database online')

    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

export default db;