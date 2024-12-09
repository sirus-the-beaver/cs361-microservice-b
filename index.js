const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const preferenceRoutes = require('./routes/preferenceRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();
const app = express();

const allowedOrigins = ['https://dishfindr-4d3c3b6f3b94.herokuapp.com', 'https://dishfindr-microservice-c-ca58d83577d1.herokuapp.com'];
app.use(cors(
    {
        origin: function (origin, callback) {
            if (allowedOrigins.indexOf(origin) !== - 1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

app.use(authMiddleware);
app.use(preferenceRoutes);
app.use(recommendationRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});