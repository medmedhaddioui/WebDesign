import sqlite3 from 'sqlite3';

async function sqliteDB (fastify)
{
    const sqlite = sqlite3.verbose();
    const db = new sqlite.Database('db')

    db.exec(`
        CREATE TABLE IF NOT EXISTS players
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        alias TEXT,
        score  REAL)`
    )
    db.run('INSERT INTO players (name, alias, score) VALUES (?, ?, ?)', ['simo', 'Jett', 0], function(err){
        if (err)
            console.log(err)
        console.log(this.lastID);
        console.log(this.changes);
    })
}
export default sqliteDB