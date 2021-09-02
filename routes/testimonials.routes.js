const express = require('express');
const router = express.Router();
var cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  let length = db.testimonials.length;
  let index = Math.floor(Math.random() * length)

  res.json(db.testimonials[index]);
});

router.route('/testimonials/:id').get((req, res) => {
  const result = db.testimonials.find(obj => {
    return obj.id == parseInt(req.params.id);
  })

  res.json(result);
});

router.route('/testimonials').post((req, res) => {
  const {author, text} = req.body;

  if (author && text) {
    const id = uuidv4();
    const element = {id: id, author: author, text: text};

    db.testimonials.push(element);

    res.json({ message: 'OK' });
  } else {
    res.status(400).json({message: '400 Bad Request' });
  }
});

router.route('/testimonials/:id').put((req, res) => {
  const {author, text} = req.body;

  if (author && text) {
    const id = parseInt(req.params.id);
    const index = db.testimonials.findIndex(element => element.id == id);

    db.testimonials[index] = {id: id, author: author, text: text};

    res.json({ message: 'OK' });
  } else {
    res.status(400).json({message: '400 Bad Request' });
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const id = parseInt(req.params.id);
  const index = db.testimonials.findIndex(element => element.id == id);

  db.testimonials.splice(index, 1);

  res.json({ message: 'OK' });
});


module.exports = router;
