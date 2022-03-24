const express = require('express');
var router = require('./router');
var sqlite3 = require('sqlite3');

var app = express()

app.use(express.static(__dirname + "/public"));

app.listen(process.env.PORT || 3000, () => console.log('hey heyyyy'));

// Insert
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/addmem', function(req,res){
  console.log(req.body);
  // add this new memorial to our database
  // var db = new sqlite3.Database('../mem.db', sqlite3.OPEN_READWRITE, (err) => {
  //     if (err) {
  //       console.log(err.code);
  //       return;
  //     }
  //     var time = new Date().toString();
  //     db.exec(`
  //       insert into memorial (mem_id, mem_title, mem_author, mem_desc, mem_color, mem_time)
  //           values (${cellID}, ${mem.title}, ${mem.author}, ${mem.narrative}, ${mem.color}, ${time});
  //     ` , ()  => {
  //             runQueries(newdb);
  //     });
  // });


  // db.serialize(()=>{
  //   db.run('INSERT INTO emp(id,name) VALUES(?,?)', [req.body.id, req.body.name], function(err) {
  //     if (err) {
  //       return console.log(err.message);
  //     }
  //     console.log("New employee has been added");
  //     res.send("New employee has been added into the database with ID = "+req.body.id+ " and Name = "+req.body.name);
  //   });
  // });
});

var db = new sqlite3.Database('./mem.db', sqlite3.OPEN_READWRITE, (err) => {

    if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
        return;
        } else if (err) {
            console.log("Getting error " + err);
            exit(1);
    }
    runQueries(db);
});

function createDatabase() {
    var newdb = new sqlite3.Database('mem.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
        createTables(newdb);
    });
}

function createTables(newdb) {
    newdb.exec(`
    create table memorial (
        mem_id int primary key not null,
        mem_title text not null,
        mem_author text not null,
        mem_desc text not null,
        mem_color text not null,
        mem_time text not null
    );
    ` , ()  => {
            runQueries(newdb);
    });
}

function runQueries(db) {
    db.all(`
    select * from memorial`, (err, rows) => {
        rows.forEach(row => {
            console.log(row.mem_id + "\t" +
            row.mem_desc + "\t" +
            row.mem_loc);
        });
    });
}
