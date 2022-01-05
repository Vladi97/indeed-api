const http = require("http");
const app = require("./app");

//console.log(process.env);
const port = process.env.PORT || 3080;
const server = http.createServer(app);
console.log("Server listening on post: " + port);
server.listen(port);

module.exports = server;
