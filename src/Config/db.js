import mongoose from "mongoose";

mongoose.set('strictQuery', false)

export const ConnectDB = (uri) => {
    return mongoose.connect(uri)
    .then(() => {
        console.log('¡Connected to MongoDB!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}