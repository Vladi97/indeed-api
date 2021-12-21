const mongoose = require("mongoose");

function connect() {
  return new Promise((resolve, reject) => {
    let database = "indeedDB";
    mongoose
      .connect(
        "mongodb+srv://dev:" +
          process.env.MONGO_ATLAS_PW +
          "@cluster0.cdwyp.mongodb.net/" +
          database +
          "retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        }
      )
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
