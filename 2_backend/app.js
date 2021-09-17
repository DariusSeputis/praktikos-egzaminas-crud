import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// connecting mongoDB
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log('MongoDB connected..');

    // Staring server
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((err) => console.log(err));

// Middlewares
app.use(cors());
app.use(express.json());

// Controllers
import {
  getAllUsers,
  postNewUser,
  deleteSingleUser,
} from './controllers/userController.js';

// Routes
// - GET
app.get('/users', getAllUsers);
// - POST
app.post('/addUser', postNewUser);
// - PUT

// - DELETE
app.delete('/deleteUser', deleteSingleUser);
