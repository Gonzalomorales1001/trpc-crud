import mongoose from 'mongoose';

const connectionKey: string = process.env.MONGODB_CNN ?? ""

export const connectDB = async () => {
    try {
        await mongoose.connect(connectionKey)
        console.log('Database connection successfully')
    } catch (error) {
        throw new Error('Failed to connect to MONGODB')
    }
}