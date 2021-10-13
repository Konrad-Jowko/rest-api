const Seat = require('../models/seats.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {

  try {
    const dep = await Seat.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.post = async (req, res) => {

  try {

    const {day, seat, client, email} = req.body;
    const cleanClient = sanitize(client);
    const cleanEmail = sanitize(email)
    const newSeat = new Seat({ day: day, seat: seat, client: cleanClient, email: cleanEmail });
    await newSeat.save();
    res.json({ message: 'OK' });
    const allSeats = await Seat.find()
    req.io.emit('seatsUpdated', allSeats);

  } catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.put = async (req, res) => {
  const {day, seat, client, email} = req.body;

  try {
    const dep = await Seat.findById(req.params.id);
    if(dep) {
      dep.day = day;
      dep.seat = seat;
      dep.client = client;
      dep.email = email;
      await dep.save();
      res.json( dep );
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.delete = async (req, res) => {

  try {
    const dep = await Seat.findById(req.params.id);
    if(dep) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};
