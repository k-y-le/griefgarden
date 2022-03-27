const express = require('express');
var router = require('./router');
var sqlite3 = require('sqlite3');
var path = require('path');

var app = express()


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
  console.log("creating db anew");
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
        id int primary key not null,
        title text not null,
        author text not null,
        desc text not null,
        color text not null,
        time text not null
    );
    ` , ()  => {
            runQueries(newdb);
    });
}

function runQueries(db) {
  console.log("in runqueries()")
    db.all(`
    select * from memorial`, (err, rows) => {
      console.log(rows);
        rows.forEach(row => {
            console.log(row.id + "\t" +
            row.title + "\t" +
            row.author);
        });
    });
}

// Insert
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var multer = require('multer');
var upload = multer();
app.use(upload.array());

// Root endpoint
var public = path.join(__dirname, 'public');

// app.get("/", (req, res, next) => {
//   console.log("get / called");
//   // res.sendFile(path.join(public, 'index.html'));
// });

app.post('/addmem', function(req, res){
  console.log("adding memorial " + req.body.title + " in cell " + req.body.id);
  var db = new sqlite3.Database('./mem.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.log(err.code);
      return;
    }
    var time = new Date().toString();
    let insert = 'INSERT INTO memorial (id, title, author, desc, color, time) VALUES (?,?,?,?,?,?)';
    db.run(insert, [req.body.id, req.body.title, req.body.author, req.body['narrative[]'], req.body.color, time]);
    runQueries(db);
  });
});

app.get('/getmem', function(req, res){
  console.log("get all memories call");
  var db = new sqlite3.Database('./mem.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.log(err.code);
      return;
    }

    let sql = `SELECT * FROM memorial`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log(err.code);
        return;
      }
      rows.forEach((row) => {
        console.log(row);
      });
      res.send(rows);
    });
  });
});

app.use(express.static(__dirname + "/public"));

app.listen(process.env.PORT || 3000, () => console.log('hey heyyyy'));
