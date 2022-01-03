const http = require("http");
const app = require("./app");

const port = process.env.PORT || 3080;
const server = http.createServer(app);
console.log("server listening on post: " + port);
server.listen(port);
