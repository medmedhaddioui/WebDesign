import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();
const db = new sqlite.Database('db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
if (err) {
    console.log(err.message);
    return ;
}
console.log("is Connected to DB");
});
let sql = `CREATE TABLE IF NOT EXISTS players (
            player_id INTEGER PRIMARY KEY,
            playerName TEXT NOT NULL)`;
db.run (sql, [], (err) => {
    if (err) {
        console.log('error creating table');
        return ;
    }
    console.log('table is created');
});

export default db
