var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://test.ltdstats.com:8080/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ltdstats");
        dbo.createCollection("games", function (err, res) {
            if (err) throw err;
            console.log("Collection games created!");
            dbo.createCollection("player", function (err, res) {
                if (err) throw err;
                console.log("Collection player created!");
                db.close();
            });
        });
    });
});


