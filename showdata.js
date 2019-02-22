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

router.all("/",function(request,response)
{
    mongoClient.connect(url,function(err,db)
    {
        if(err) throw err;
        var dbo = db.db("chatdetails");
        var array_obj = [];
        dbo.collection("details").find({}).toArray(function(err,res)
        {
            if(err) throw err;
            //response.json(res);
            // var a = {records:res};
            for(var i=0;i<res.length;i++)
            {
                //console.log(res[i]);
                var record = res[i];
                var id = record._id;
                var name = record.username;
                var data = record.encdata;
                var key = record.enckey;
                //console.log(id+" "+name+" "+data+ " "+key);
                var realdata = CryptoJS.AES.decrypt(data.toString(),key);
                var realdata = realdata.toString(CryptoJS.enc.Utf8);
                var obj = {_id:id,username:name,message:realdata,enckey:key};
                array_obj.push(obj);
            }
            // dbo.collection("decrypteddata").insertMany(array_obj,function(error,res)
            // {
            //     if(error) throw error;
            //     console.log("Inserted");
            // });
            fs.writeFile("decrypted.php",JSON.stringify({records:array_obj}),function(err,res)
            {
                response.sendFile(__dirname + "/showdecrypted.html");
            });
        });
    });
});

module.exports = router;