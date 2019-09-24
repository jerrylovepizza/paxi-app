const db = require("../models/index");

// Defining methods for the booksController
module.exports = {

  createPack: function (req, res) {
    // console.log("\n create pack from: ", req.body)
    db.Pack.create(req.body)
      .then(dbModel => {
        // console.log("\n created new pack: ", dbModel, "\n");
        // console.log("===== new pack id: ", dbModel._id);
        // console.log("===== new pack belong to user: ", dbModel.userId);
        return db.User.findOneAndUpdate({ _id: dbModel.userId }, { $push: { pack: dbModel._id } }, { new: true });
      })
      .then(dbUser => {
        // console.log("\n response the user info: ", dbUser);
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },

  findUserPacks: function (req, res) {
    // console.log("userId: ", req.params.userId)
    db.User.findById(req.params.userId)
      .populate("pack")
      .populate("carrier")
      // .sort({ date: -1 })
      .then(dbModel => {
        // console.log("\n find user's packs from mongo: ", dbModel.pack);
        // console.log( "\n find user's carried from mongo: ", dbModel.carrier);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  findUnpicked: function (req, res) {
    db.Pack.find({ isPicked: false })
      // .sort({ date: -1 })
      .then(dbModel => { res.json(dbModel); console.log("find unpicked from mongo", "dbModel") })
      .catch(err => res.status(422).json(err));
  },

  findAllPacks: function (req, res) {
    db.Pack.find()
      // .sort({ date: -1 })
      .then(dbModel => { res.json(dbModel); console.log("find all from mongo", "dbModel") })
      .catch(err => res.status(422).json(err));
  },

  findUser: function (req, res) {
    db.User.find({ _id: req.params.id })
      .then(dbModel => { res.json(dbModel); console.log("find user", "dbModel") })
      .catch(err => res.status(422).json(err));
  },


  updateCarrier: function (req, res) {
    // console.log("\n req.params.userId:", req.params.userId, "\n req.params.packId:", req.params.packId);
    db.Pack.findOneAndUpdate({ _id: req.params.packId }, { isPicked: true, carrierId: req.params.userId })
      // .then(dbModel => {
      //   //   console.log("\n ========: ", dbModel, "\n");
      //   const { title, from, to, size, weight, receiver, fee, image, description } = dbModel;
      //   const packIn = { title, from, to, size, weight, receiver, fee, image, description };
      //   const packId = dbModel._id;
      //   db.Carrier.collection.insertMany(packIn,packId)
      //   //   return db.Carrier.create(dbModel);
      // })
      .then(dbModel => {
        // console.log("\n pack status changed: ", req.params.userId, req.params.packId, "\n");
        return db.User.findOneAndUpdate({ _id: req.params.userId }, { $push: { carrier: req.params.packId } }, { new: true });
      })
      .then(dbModel => res.json(dbModel))
      // .then(user => {
      //   res.redirect('/profile');
      // })
      .catch(err => res.status(422).json(err));
  },

  updateDelivered: function (req, res) {
    // console.log("req.params.packId", req.params.packId)
    db.Pack.findOneAndUpdate({ _id: req.params.packId }, { isDelivered: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createMsgBtn: function (req, res) {
    db.Message.create(req.body)
      .then(newMsg => {
        // console.log("\n new message created: ", newMsg, "\n");
        return db.User.findOneAndUpdate({ _id: req.body.userid }, { $push: { message: newMsg._id } }, { new: true });
      })
      .then(dbUser => {
        // console.log("\n response the user info: ", dbUser);
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },

  replyMsgBtn: function (req, res) {
    db.Message.create(req.body)
      .then(reMsg => {
        console.log("\n new message created: ", reMsg, "\n");
        if (req.params.loginid === reMsg.userid) {
          return db.User.findOneAndUpdate({ _id: reMsg.carrierid }, { $push: { message: reMsg._id } }, { new: true });
        }
        else if (req.params.loginid === reMsg.carrierid) {
          return db.User.findOneAndUpdate({ _id: reMsg.userid }, { $push: { message: reMsg._id } }, { new: true });
        }
      })
      .then(dbUser => {
        // console.log("\n response the user info: ", dbUser);
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },

  removeMsgBtn: function (req, res) {
    console.log("\n message: ", "\n");
    db.Message.deleteOne({ _id: req.params.msgId })
      .then(dbUser => {
        // console.log("\n response the user info: ", dbUser);
        res.json(dbUser);
      })
      .catch(err => res.status(422).json(err));
  },

  findAllMsg: function (req, res) {
    // console.log(req.params.userId)
    db.User.find({ _id: req.params.userId })
      .populate("message")
      .then(dbModel => {
        res.json(dbModel[0]);
        //  console.log("find user and message", dbModel[0])
      })
      .catch(err => res.status(422).json(err));
  },



  // createUser: function (req, res) {
  //   // console.log(req.body)
  //   db.User.create(req.body)
  //     .then(user => {
  //       res.redirect('/login');
  //       // res.json(user);
  //       console.log("response from mongo:", user)
  //     })
  //     .catch(err => console.log(err));
  // },

  // findUser: function (req, res) {
  //   console.log("login infor", req.body)
  //   db.User.findOne({ email: req.body.email })
  //     .then(dbModel => {
  //       console.log("then:", dbModel);
  //     })
  // .catch(err => res.status(422).json(err));


};
