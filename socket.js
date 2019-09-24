const db = require("./models");

module.exports = function (socket) {

    socket.on("package uploaded", function (data) {
        console.log(socket.id);

    })
};