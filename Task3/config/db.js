import mongoose from 'mongoose'


const connectdb = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected: ', conn.connection.host);
    } catch (error) {
        console.log(error);
    }
}

export default connectdb;