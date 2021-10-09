const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts/performer/:performer', () => {
  before(async () => {
  const testDepOne = new Concert({ performer:"John Doe", genre:"Rock", price: 25, day: 1, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepOne.save();

  const testDepTwo = new Concert({ performer:"Amanda Doe Amber", genre:"American Punk", price: 25, day: 1, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepTwo.save();

  const testDepThree = new Concert({ performer:"Fergie", genre:"Pop", price: 25, day: 1, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepThree.save();

  const testDepFour = new Concert({ performer:"John Doe", genre:"Rock", price: 25, day: 1, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepFour.save();
});

  it(' should return all concerts matching the :performer ', async () => {
    const res = await request(server).get('/api/concerts/performer/John Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    for (concert of res.body) {
      expect(concert.performer).to.be.equal('John Doe');
    }

  });

  it(' should return return response if there is only one performer matching ', async () => {
    const res = await request(server).get('/api/concerts/performer/Amanda Doe Amber');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].performer).to.be.equal('Amanda Doe Amber');
  });

  it(' should return return response regardless of how many parts the performer name has ', async () => {
    const performers = ["John Doe", "Amanda Doe Amber", "Fergie"];

    for (performer of performers) {
      const res = await request(server).get(`/api/concerts/performer/${performer}`);
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].performer).to.be.equal(performer);
    }
  });

  it(' should return return "No concerts found" message, when performer does not match ', async () => {
      const res = await request(server).get('/api/concerts/performer/ABBA');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.equal('No concerts found');
  });

  it(' should return error if no performer is given', async () => {
      const res = await request(server).get('/api/concerts/performer/');
      expect(res.status).to.be.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.not.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });

});

describe('GET /api/concerts/genre/:genre', () => {
  before(async () => {
  const testDepOne = new Concert({ performer:"John Doe", genre:"Rock", price: 25, day: 1, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepOne.save();

  const testDepTwo = new Concert({ performer:"Amanda Doe Amber", genre:"American Punk", price: 25, day: 1, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepTwo.save();

  const testDepThree = new Concert({ performer:"Fergie", genre:"Pop", price: 25, day: 1, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepThree.save();

  const testDepFour = new Concert({ performer:"John Doe", genre:"Rock", price: 25, day: 1, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepFour.save();
});

  it(' should return all concerts matching the :genre ', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    for (concert of res.body) {
      expect(concert.genre).to.be.equal('Rock');
    }

  });

  it(' should return return response if there is only one matching the genre ', async () => {
    const res = await request(server).get('/api/concerts/genre/Pop');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].genre).to.be.equal('Pop');
  });

  it(' should return return response regardless of how many parts the genre name has ', async () => {
    const genres = ["Rock", "American Punk"];

    for (genre of genres) {
      const res = await request(server).get(`/api/concerts/genre/${genre}`);
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].genre).to.be.equal(genre);
    }
  });

  it(' should return return "No concerts found" message, when genre does not match ', async () => {
      const res = await request(server).get('/api/concerts/genre/Metal');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.equal('No concerts found');
  });

  it(' should return error if no genre is given', async () => {
      const res = await request(server).get('/api/concerts/genre/');
      expect(res.status).to.be.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.not.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });

});

describe('GET /concerts/price/day/:day', () => {
  before(async () => {
  const testDepOne = new Concert({ performer:"John Doe", genre:"Rock", price: 25, day: 1, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepOne.save();

  const testDepTwo = new Concert({ performer:"Amanda Doe Amber", genre:"American Punk", price: 25, day: 2, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepTwo.save();

  const testDepThree = new Concert({ performer:"Fergie", genre:"Pop", price: 25, day: 3, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepThree.save();

  const testDepFour = new Concert({ performer:"John Doe", genre:"Rock", price: 25, day: 1, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepFour.save();
});

  it(' should return all concerts matching the :day ', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    for (concert of res.body) {
      expect(concert.day).to.be.equal(1);
    }

  });

  it(' should return return response if there is only one matching the day ', async () => {
    const res = await request(server).get('/api/concerts/day/3');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].day).to.be.equal(3);
  });

  it(' should return return "No concerts found" message, when day does not match ', async () => {
      const res = await request(server).get('/api/concerts/day/12');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.equal('No concerts found');
  });

  it(' should return error if no day is given', async () => {
      const res = await request(server).get('/api/concerts/day/');
      expect(res.status).to.be.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.not.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });
});

describe('GET /concerts/price/:price_min/:price_max', () => {
  before(async () => {
  const testDepOne = new Concert({ performer:"John Doe", genre:"Rock", price: 25, day: 1, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepOne.save();

  const testDepTwo = new Concert({ performer:"Amanda Doe Amber", genre:"American Punk", price: 10, day: 2, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepTwo.save();

  const testDepThree = new Concert({ performer:"Fergie", genre:"Pop", price: 66, day: 3, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepThree.save();

  const testDepFour = new Concert({ performer:"John Doe", genre:"Rock", price: 25, day: 1, image:"/img/uploads/1fsd324fsdg.jpg" });
  await testDepFour.save();
});

  it(' should return all concerts matching the range between :price_min and :price_max ', async () => {
    const res = await request(server).get('/api/concerts/price/25/66');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(3);

  });

  it(' should return return response if there is only one matching he range between :price_min and :price_max  ', async () => {
    const res = await request(server).get('/api/concerts/price/1/12');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
    expect(res.body[0].price).to.be.equal(10);
  });

  it(' should return return response if :price_min and :price_max are in the wrong order ', async () => {
    const res = await request(server).get('/api/concerts/price/12/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
    expect(res.body[0].price).to.be.equal(10);
  });

  it(' should return return "No concerts found" message, when price range does not match ', async () => {
      const res = await request(server).get('/api/concerts/price/122/1200');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.equal('No concerts found');
  });

  it(' should return error if no range is given', async () => {
      const res = await request(server).get('/api/concerts/price/');
      expect(res.status).to.be.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.not.null;
  });



  after(async () => {
    await Concert.deleteMany();
  });

});
