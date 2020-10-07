//import bcrypt from 'bcryptjs';
let mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getuserById = function (id, cb) {
  User.findById(id, cb);
};

module.exports.getuserByUsername = function (username, cb) {
  User.findOne({ username: username }, cb);
};

module.exports.createUser = function (newUser, cb) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(cb);
    });
  });
};

module.exports.comparepassword = function (myPassword, hash, cb) {
  // bycrypt.compare(myPassword, hash, function(err, isMatch){
  if (myPassword == hash) {
    //if(err) throw err;
    cb(null, true);
  }
}; // )
// }
