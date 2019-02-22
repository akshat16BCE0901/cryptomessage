var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var express = require("express");
var router = express.Router();
var submit = require("./submit");
var app = new express();
var bodyParser = require("body-parser");
var CryptoJS = require("crypto-js");
var url = "mongodb://localhost:27017/";
var fs = require("fs");

app.use(bodyParser.urlencoded({extended:true}));

router.all("/",function(request,response)
{
   // response.send("Hello, the request has been processed");
    mongoClient.connect(url,function(err,db)
    {
        if(err) throw err;
        var dbo = db.db("chatdetails");
        dbo.collection("details").find({}).toArray(function(err,res)
        {
            if(err) throw err;
            //response.json(res);
            var a = {records:res};
            fs.writeFile("answer.php",JSON.stringify(a),function(err,res)
            {
                response.sendFile(__dirname + "/display.html");
            });
        })
    });
});

module.exports = router;