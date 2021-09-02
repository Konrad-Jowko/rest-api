const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const result = db.concerts.find(obj => {
    return obj.id == parseInt(req.params.id);
  })

  res.json(result);
});

router.route('/concerts').post((req, res) => {
  const {performer, genre, price, day, image} = req.body;

  if (performer && genre && price && day && image) {
    const id = uuidv4();
    const element = {id: id, performer: performer, genre: genre, price: parseInt(price), day: parseInt(day), image: image};

    db.concerts.push(element);

    res.json({ message: 'OK' });
  } else {
    res.status(400).json({message: '400 Bad Request' });
  }
});

router.route('/concerts/:id').put((req, res) => {
  const {performer, genre, price, day, image} = req.body;

  if (performer && genre && price && day && image) {
    const id = parseInt(req.params.id);
    const index = db.concerts.findIndex(element => element.id == id);

    db.concerts[index] = {id: id, performer: performer, genre: genre, price: parseInt(price), day: parseInt(day), image: image};

    res.json({ message: 'OK' });
  } else {
    res.status(400).json({message: '400 Bad Request' });
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const id = parseInt(req.params.id);
  const index = db.concerts.findIndex(element => element.id == id);

  db.concerts.splice(index, 1);

  res.json({ message: 'OK' });
});


module.exports = router;
