const express = require('express');
const router = express.Router();
const Controller = require("../controllers/api-controller");

// post new pack
router
  .route("/pack/create")
  .post(Controller.createPack);

// find user packs
router
  .route("/pack/find/:userId")
  .get(Controller.findUserPacks);

// find all packs
router
  .route("/pack/findall")
  .get(Controller.findAllPacks);

// carrier find all available packs
router
  .route("/pack/findunpicked")
  .get(Controller.findUnpicked);

// carrier pick a pack
router
  .route("/pack/carrier/:userId/:packId")
  .put(Controller.updateCarrier);

// carrier delivered a pack
router
  .route("/pack/delivered/:packId")
  .put(Controller.updateDelivered);

// carrier send messages
router
.route("/message/create")
.post(Controller.createMsgBtn);

// user reply messages
router
.route("/message/reply/:loginid")
.post(Controller.replyMsgBtn);

// user remove messages
router
.route("/message/remove/:msgId")
.delete(Controller.removeMsgBtn);

// user show messages
router
  .route("/message/find/:userId")
  .get(Controller.findAllMsg);


module.exports = router;
