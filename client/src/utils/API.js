import axios from "axios";

export default {

  userRegister: function (newUserObj) {
    return axios.post("/register", newUserObj)
  },

  userLogin: function (userObj) {
    console.log("login request api")
    return axios.post("/login", userObj)
  },

  userLogout: function () {
    return axios.get("/logout")
  },

  createPackBtn: (packInfo) => {
    return axios.post("/api/pack/create", packInfo);
  },

  findUserPacks: (userId) => {
    return axios.get("/api/pack/find/" + userId);
  },

  findAllPacks: () => {
    return axios.get("/api/pack/findall");
  },

  findUnpicked: () => {
    return axios.get("/api/pack/findunpicked");
  },

  updateCarrier: (userId, packId) => {
    // console.log("reactAPI client req: carrier picked", userId, packId);
    return axios.put(`/api/pack/carrier/${userId}/${packId}`);
  },

  updateDelivered: (packId) => {
    return axios.put("/api/pack/delivered/" + packId);
  },

  createMsgBtn: (msgInfo) => {
    return axios.post("/api/message/create", msgInfo);
  },

  replyMsgBtn: (loginid, msgInfo) => {
    return axios.post("/api/message/reply/" + loginid, msgInfo);
  },

  removeMsgBtn: (msgId) => {
    return axios.delete("/api/message/remove/" + msgId);
  },

  findAllMsg: (userId) => {
    return axios.get("/api/message/find/" + userId);
  },

  // createUserBtn: (userInfo) => {
  //   console.log("reactAPI client req:", "userInfo");
  //   return axios.post("/api/user/create", userInfo);
  // },
  // findUserBtn: (userLogInfo) => {
  //   console.log("reactAPI client req: find the user to login");
  //   return axios.post("/api/user/find", userLogInfo);
  // },
  // logout: () => {
  //   console.log("reactAPI client req: find the user to login");
  //   return axios.get("/logout");
  // },

  // findUser: (id) => {
  //   return axios.get("/findUser/" + id);
  // }

};
