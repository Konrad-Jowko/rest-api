const express = require('express');
const path = require('path');
var cors = require('cors');
const db = require('./db.js')

const app = express();

app.use(cors());

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

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
