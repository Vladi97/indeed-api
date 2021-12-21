const http = require("http");
const app = require("./app");
// socketIo = require("socket.io");

const port = process.env.PORT || 5080;

const server = http.createServer(app);
console.log("server listening on post: " + port);
server.listen(port);
