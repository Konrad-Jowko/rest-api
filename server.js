const express = require('express');
const path = require('path');
var cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');



const app = express();

app.use(cors());

app.use(helmet());
app.use((req, res, next) => {
  req.io = io;
  next();
});

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.json({ message: 'Not found...' });
})

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = `mongodb+srv://${process.env.user}:${process.env.access}@newwavedb.iibtz.mongodb.net/${process.env.database}?retryWrites=true&w=majority`;
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDBTest';
else dbUri = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');
});

module.exports = server;
