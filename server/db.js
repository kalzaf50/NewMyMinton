import 'dotenv/config'
import mongoose from 'mongoose'

// lmao
mongoose.connect(process.env.MONGODB_ENDPOINT)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

