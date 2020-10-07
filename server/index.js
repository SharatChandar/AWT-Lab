var bodyParser = require("body-parser");
var express = require("express");
const mongoose = require("mongoose");
const config = require("./config/database");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var morgan = require("morgan");
var cors = require("cors");
//const bcrypt = require('bcryptjs');
//const passport = require('passport');
//const session = require('express-session');
//var path = require('path');
var app = express();
let User = require("./models/user");
let Data = require("./models/data");

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;

db.once("open", function () {
  console.log("Connected to mongodb");
});

db.on("error", function (err) {
  console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
//express session middleware
//app.use(session({
//  secret: 'keyboard cat',
// resave: true,
// saveUninitialized: true
//}));
//passport config
//require('./config/passport')(passport);
//passport middle wares
app.use(passport.initialize());
app.use(passport.session());
//variable

app.get("/api/items", verifyToken, function (req, res) {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.getuserById(authData.id, function (err, user) {
        if (err) throw err;
        if (user) {
          Data.find().then((item) => res.json(item));
        } else {
          res.json({ success: false, username: null });
        }
      });
    }
  });
});

app.get("/api/users", verifyToken, function (req, res) {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.getuserById(authData.id, function (err, user) {
        if (err) throw err;
        if (user) {
          User.find().then((item) => res.json(item));
        } else {
          res.json({ success: false, username: null });
        }
      });
    }
  });
});

app.post("/items", verifyToken, function (req, res) {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.getuserById(authData.id, function (err, user) {
        if (err) throw err;
        if (user) {
          var nprice;
          const nitem = new Data({
            id: req.body.id,
            item: req.body.item,
            qta: req.body.qta,
            price: req.body.price,
          });

          const query = { id: req.body.id };
          Data.findOne(query, function (err, item) {
            if (!item) {
              nitem.save().then((item) => res.json(item));
            } else {
              if (req.body.price === "") {
                nprice = item.price;
              } else {
                nprice = req.body.price;
              }
              Data.update(
                query,
                {
                  id: req.body.id,
                  item: item.item,
                  qta: Number(item.qta) + Number(req.body.qta),
                  price: nprice,
                },
                function (err, result) {
                  if (err) {
                    console.log(err);
                  }
                  console.log(result);
                }
              );
              console.log("updated.....");
              console.log(req.body);
            }
          });
        } else {
          res.json({ success: false, username: null });
        }
      });
    }
  });
});

app.post("/registor", function (req, res) {
  const nuser = new User({
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });
  nuser.save().then((user) => res.json(user));
});

app.post("/getitem", verifyToken, function (req, res) {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.getuserById(authData.id, function (err, user) {
        if (err) throw err;
        if (user) {
          const query = { id: req.body.id };
          Data.findOne(query, function (err, result) {
            if (err) {
              console.log(err);
            }
            if (!result) {
              console.log("item not find");
              res.json({ msg: "item not available...." });
            } else {
              res.json(result);
            }
          });
        } else {
          res.json({ success: false, username: null });
        }
      });
    }
  });
});

app.post("/login", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  User.getuserByUsername(username, function (err, user) {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, massage: "No User Found..." });
    }
    //User.comparepassword(password, user.password, function (err, isMatch) {
    //  if (err) throw err;
    if (password === user.password) {
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 6000000,
      });
      console.log(token);
      res.json({ success: true, token: token, user: user.fullname });
    } else {
      return res.json({ success: false, massage: "invalid password...." });
    }
    //})
  });
});

app.post("/sell", verifyToken, (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.getuserById(authData.id, function (err, user) {
        if (err) throw err;
        if (user) {
          req.body.items.map((item) => {
            if (item.id) {
              Data.findOne({ id: item.id }).then((itm) => {
                console.log(itm);
                const qta2 = itm.qta;
                Data.update(
                  { id: item.id },
                  {
                    id: itm.id,
                    item: itm.item,
                    price: itm.price,

                    qta: Number(qta2) - Number(item.qta),
                  },
                  function (err, result) {
                    if (err) {
                      console.log(err);
                    }
                    if (result) {
                      console.log(result);
                    }
                  }
                );
              });
            }
          });
          res.json({ success: "ok" });
        } else {
          res.json({ success: false, username: null });
        }
      });
    }
  });
});

app.get("/user/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.getuserById(authData.id, function (err, user) {
        if (err) throw err;
        if (user) {
          User.findById(req.params.id).then((user) =>
            user.remove().then(() => res.json({ success: true }))
          );
        } else {
          res.json({ success: false, username: null });
        }
      });
    }
  });
});

app.get("/item/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.getuserById(authData.id, function (err, user) {
        if (err) throw err;
        if (user) {
          Data.findOne({ id: req.params.id }, function (err, item) {
            item.remove().then(() => res.json({ success: true }));
          });
        } else {
          res.json({ success: false, username: null });
        }
      });
    }
  });
});

app.get("/verify", verifyToken, function (req, res, next) {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.getuserById(authData.id, function (err, user) {
        if (err) throw err;
        if (user) {
          res.json({ access: true, username: user.username });
        } else {
          res.json({ success: false, usernaem: null });
        }
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    //const bearer = bearerHeader.split(' ');

    // const bearerToken = bearer[1];

    req.token = bearerHeader;
    next();
  } else {
    res.sendStatus(401);
  }
}

app.listen(5000, function () {
  console.log("server started at 5000");
});
