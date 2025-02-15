import mongoose from "mongoose";

export async function connectToMongoDB() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        console.log("Connected to MongoDB")
        // const connection = mongoose.connection
        // connection.on('connected', () => {
        //     console.log('Connected to MongoDB')
        // })
        // connection.on('error', (err) => {
        //     console.log('MongoDB Connection Failed: ' + err)
        //     process.exit()
        // })
    } catch (error) {
        console.log('Error connecting to MongoDB: ' + error)
    }
}