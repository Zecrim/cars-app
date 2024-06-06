const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const testJWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const profilesRouter = require('./controllers/profiles');
const garagesRouter = require('./controllers/garages')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(path.dirname(__dirname), 'react-jwt-auth-template-main', 'dist')))


// Routes go here
app.use('/test-jwt', testJWTRouter);
app.use('/users', usersRouter);
app.use('/profiles', profilesRouter);
app.use('/:userId/garages', garagesRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'react-jwt-auth-template-main', 'dist', 'index.html'));
});

app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});