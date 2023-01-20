const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://richardadesina:iSdvucYF0Ks9BG7X@cluster0.statdgd.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("CONNECTED! from nosql");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log("nosql err", err);
    });
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
