import mongoose from 'mongoose';

const URL = process.env.DATABASE_URL;

const mongoDBconnect = async () => {
    await mongoose.connect(URL).then(() => {
        console.log("database connected")
    }).catch((err) => {
        console.log(err);
    })

}



export default mongoDBconnect