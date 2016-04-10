var mongoose = require("mongoose");

mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/project1");


module.exports.Post = require("./post");
module.exports.Trip = require("./trip");
module.exports.User = require("./user");
