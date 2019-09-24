const express = require("express");
const mongoose = require("mongoose");
// const multer = require("multer");
const morgan = require("morgan");
const app = express();
const path = require('path');

const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
// Connect flash
app.use(flash());
//log every request to the console
app.use(morgan("dev"));

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
const mongoURL = process.env.MONGODB_URI || "mongodb://localhost/paxiDB"
mongoose.connect(mongoURL, { useNewUrlParser: true })
  .then(() => {
    console.log("🌎 ==> Successfully connected to mongoDB.");
  })
  .catch((err) => {
    console.log(`Error connecting to mongoDB: ${err}`);
  });


// Passport Config
require('./config/passport')(passport);
// require('./config/auth');

// Express session
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => { require("./socket.js") });

// Express Routes
// const routes = require("./routes");
// app.use(routes);
app.use('/', require('./routes/index.js'));
app.use('/api', require('./routes/api.js'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Start the API server
const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});



/////////////////////////////////////////////////////////////
