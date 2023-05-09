import mongoose from "mongoose";


const db = async() => {
    try{
       
        //Set strictquery in mongoose
        mongoose.set('strictQuery', true);

        //Connection databse
        await mongoose.connect(
            'mongodb+srv://admin:root@cluster0.pzvdy2j.mongodb.net/mastergas'
        )

        console.log('Database online')

    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

export default db;