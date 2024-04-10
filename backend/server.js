const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./backend/controllers/userRoute');
const cookieParser = require('cookie-parser');
const authRoutes = require('./backend/routes/authRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
const errorHandler = require('./backend/middleWare/errorMiddleware');

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
