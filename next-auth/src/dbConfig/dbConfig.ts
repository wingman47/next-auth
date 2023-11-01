import mongoose from 'mongoose'

export async function connect() {
    try {
        // "!" means the URI will always be available
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB Connected');
        })
        connection.on('error', (error) => {
            console.log(error);
            process.exit()
        })
    } catch (error) {
        console.log(error);
        
    }
}