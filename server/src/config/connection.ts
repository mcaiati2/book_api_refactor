// Module that allows us to use dotenv.config();
import dotenv from 'dotenv';

// Read the .env file and load the variables into process.env
dotenv.config();

// Mongoose - schema based solution to model application's data
import mongoose from 'mongoose';

// Use the 'mongoose' object to connect to the database (try the URI listed on .env file, then static)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/googlebooks');

// Reference to the connection established above, stored to db variable
const db = mongoose.connection;

// Export database for use in other files
export default db;