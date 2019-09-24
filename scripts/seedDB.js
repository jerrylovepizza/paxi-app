const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

const mongoURL = process.env.MONGODB_URI || "mongodb://localhost/paxiDB"
mongoose.connect(mongoURL, { useNewUrlParser: true })
  .then(() => {
    console.log("🌎 ==> Successfully connected to mongoDB.");
  })
  .catch((err) => {
    console.log(`Error connecting to mongoDB: ${err}`);
  });


const userSeed = [
  {
    fullName: "Bruce Lee",
    gender:"M",
    dob: "11/27/1940",
    dl: "N3456-7890",
    ssn: "287-6512-3392",
    address: "123 Main St Apt#900, New York, NY 11000"
  }
];

const packSeed = [
  {
    title: "Nun Chucks",
    from:"123 Main St Apt#900, New York, NY 11000",
    to: "home",
    size: "30x30",
    weight: "5lbs",
    image: "null",
    description: "paxi is the best",
    receiver: "ip man",
    fee: "$100"
  }
];

db.User
  // .remove({})
  .deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    // process.exit(0);
  })
  .catch(err => {
    console.error(err);
    // process.exit(1);
  });

  db.Pack
  // .remove({})
  .deleteMany({})
  .then(() => db.Pack.collection.insertMany(packSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });