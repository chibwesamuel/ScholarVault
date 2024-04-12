import express, { json, urlencoded } from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import { default as authRoutes } from '../routes/authRoutes.js';
import bodyParser from 'body-parser'; // Use a unique variable name for this import
import userRoute from '../controllers/userRoute.js'; // Use a unique variable name for this import

const app = express();
const { json: _json } = bodyParser;
const { userController, errorHandler } = userRoute;

// Middlewares
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: false }));
app.use(_json());

// Routes Middleware
app.use('/api/users', userController);
app.use('/api/auth', authRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Error Middleware
app.use(errorHandler);

// Connecting the DB and starting the server
const PORT = process.env.PORT || 5000;

connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));