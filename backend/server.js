import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from '../routes/userRoute.js';
import cookieParser from 'cookie-parser';
import { default as authRoutes } from '../routes/authRoutes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
const errorHandler = require('./middleWare/errorMiddleware');

// Routes Middleware
app.use('/api/users', userRoute);
app.use('/api/auth', authRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Error Middleware
app.use(errorHandler);

// Connecting the DB and starting the server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
