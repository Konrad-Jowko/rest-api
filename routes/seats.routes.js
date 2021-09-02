const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const result = db.seats.find(obj => {
    return obj.id == parseInt(req.params.id);
  })

  res.json(result);
});

router.route('/seats').post((req, res) => {
  const {day, seat, client, email} = req.body;

  if (day && seat && client && email) {
    const id = uuidv4();
    const element = {id: id, day: parseInt(day), seat: parseInt(seat), client: client, email: email};
    const test = db.seats.filter(obj => obj.day == parseInt(day) && obj.seat == parseInt(seat))

    if (test.length) {
      res.status(400).json({ message: "The slot is already taken..." });
    } else {
      db.seats.push(element);
      res.json({ message: 'OK' });
    }
  } else {
    res.status(400).json({message: '400 Bad Request' });
  }
});

router.route('/seats/:id').put((req, res) => {
  const {day, seat, client, email} = req.body;

  if (day && seat && client && email) {
    const id = parseInt(req.params.id);
    const index = db.seats.findIndex(element => element.id == id);

    db.seats[index] = {id: id, day: parseInt(day), seat: parseInt(seat), client: client, email: email};

    res.json({ message: 'OK' });
  } else {
    res.status(400).json({message: '400 Bad Request' });
  }
});

router.route('/seats/:id').delete((req, res) => {
  const id = parseInt(req.params.id);
  const index = db.seats.findIndex(element => element.id == id);

  db.seats.splice(index, 1);

  res.json({ message: 'OK' });
});


module.exports = router;
