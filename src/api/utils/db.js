const mongoose = require("mongoose");

function connect() {
  //const mongoUri =
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGO_URI_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
