const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://richardadesina:iSdvucYF0Ks9BG7X@cluster0.statdgd.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("CONNECTED! from nosql");
      callback(client);
    })
    .catch((err) => {
      console.log("nosql err", err);
    });
};

module.exports = mongoConnect;
