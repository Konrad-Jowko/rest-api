const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Concert.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getPerformer = async (req, res) => {
  try {
    const concerts = await Concert.find();
    const filteredConcerts = [];
    if(!concerts) res.status(404).json({ message: 'Not found' });
    else {
      concerts.map(concert => {
        if(concert.performer === req.params.performer) filteredConcerts.push(concert);
      });

      if(filteredConcerts.length > 0) {
        res.json(filteredConcerts);
      } else {
        res.send({ message: 'No concerts found' });
      }
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getGenre = async (req, res) => {
  try {
    const concerts = await Concert.find();
    const filteredConcerts = [];
    if(!concerts) res.status(404).json({ message: 'Not found' });
    else {
      concerts.map(concert => {
        if(concert.genre === req.params.genre) filteredConcerts.push(concert);
      });

      if(filteredConcerts.length > 0) {
        res.json(filteredConcerts);
      } else {
        res.send({ message: 'No concerts found' });
      }
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getPrice = async (req, res) => {
  let { price_min, price_max } = req.params;
  if (!price_min || !price_max) {
    res.status(500).json({ message: err });
  } else {
    if (price_min > price_max) {
      price_min = req.params.price_max;
      price_max = req.params.price_min;
    }

    try {
      const concerts = await Concert.find();
      const filteredConcerts = [];
      if(!concerts) res.status(404).json({ message: 'Not found' });
      else {
        concerts.map(concert => {
          if(concert.price >= price_min && concert.price <= price_max) filteredConcerts.push(concert);
        });

        if(filteredConcerts.length > 0) {
          res.json(filteredConcerts);
        } else {
          res.send({ message: 'No concerts found' });
        }
      }
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }
};

exports.getDay = async (req, res) => {
  try {
    const concerts = await Concert.find();
    const filteredConcerts = [];
    if(!concerts) res.status(404).json({ message: 'Not found' });
    else {
      concerts.map(concert => {
        if(concert.day == parseInt(req.params.day)) filteredConcerts.push(concert);
      });

      if(filteredConcerts.length > 0) {
        res.json(filteredConcerts);
      } else {
        res.send({ message: 'No concerts found' });
      }
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.post = async (req, res) => {
  const {performer, genre, price, day, image} = req.body;

  try {
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.put = async (req, res) => {
  const {performer, genre, price, day, image} = req.body;

  try {
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      dep.performer = performer;
      dep.genre = genre;
      dep.price = price;
      dep.day = day;
      dep.image = image;
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
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};
