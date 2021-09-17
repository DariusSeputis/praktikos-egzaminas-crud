const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

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
import { getAllUsers } from './controllers/userController.js';

// Routes
// - GET
app.get('/users', getAllUsers);
// - POST

// - PUT

// - DELETE
