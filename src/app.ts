import 'dotenv/config';

import mongoose from 'mongoose';
import express, {Application} from 'express';
import cors from 'cors';
import movieRouter from './routes/movieRoutes';
import favoriteRouter from './routes/favoriteRoutes';
import {ConnectionOptions} from "node:tls";


const app: Application = express();

app.use(cors());
app.use(express.json());

// Conectar a MongoDB
const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://admin:password@localhost:27017/netflixdb';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectionOptions).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => console.error('MongoDB connection error:', err));

// Test ping endpoint
app.get('/ping', (req, res) => {
    res.json({message: 'Backend is working!'});
});
// app.use('/api', movieRouter);
app.use('/api', favoriteRouter);


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
