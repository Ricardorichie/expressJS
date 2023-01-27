const { ObjectId } = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }
  save() {
    const db = getDb();
    db.collection("users")
      .insertOne(this)
      .then()
      .catch((err) => {
        console.log("user error", err);
      });
  }
  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// //arguements: table name, columns
// const User = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING,
// });
// module.exports = User;
