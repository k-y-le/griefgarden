var sqlite3 = require('sqlite3');

var db;
new sqlite3.Database('./mem.db', sqlite3.OPEN_READWRITE, (err) => {
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
  var time = new Date().toString();
    newdb.exec(`
    create table memorial (
        mem_id int primary key not null,
        mem_author text not null,
        mem_desc text not null,
        mem_time text not null,
        mem_location text not null
    );
    insert into memorial (mem_id, mem_author, mem_desc, mem_time, mem_location)
        values (1, 'kyle', 'testing to see if this works!', '${time}', '[1, 5]');

    create table zone (
        zone_id int not null,
        zone_arr int[] not null
    );

    insert into zone (zone_id, zone_arr)
        values (0, [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]),
               (1, [2, 1, 1, 2, 2, 3, 3, 4, 6, 6]),
               (2, [5, 5, 1, 1, 2, 2, 3, 3, 4, 6]);
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
            row.mem_location);
        });
    });
    db.all(`
    select * from zone`, (err, rows) => {
        rows.forEach(row => {
            console.log(row.zone_id + "\t" +
            row.zone_arr);
        });
    });
}
