var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var express = require("express");
var router = express.Router();
var submit = require("./submit.js");
var decryptinfo = require("./decryptinfo.js");
var app = new express();
var bodyParser = require("body-parser");
var showdata = require("./showdata.js");
var url = "mongodb://localhost:27017/";

app.use(bodyParser.urlencoded({extended:true}));
app.use("/submit",submit);
app.use("/decryptinfo",decryptinfo);
app.use("/showdata",showdata);
app.listen(3000);