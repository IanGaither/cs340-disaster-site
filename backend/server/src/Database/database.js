const mysql = require('promise-mysql');

//db pool
var db;

module.exports.connectDB = async function()
{
    let data = await mysql.createPool({
    pool            : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_DATABASE_NAME
    }).then(function(pool) {
        db = pool;
        return db;
    });
}

module.exports.getDB = function()
{
    if(!db)
        throw 'Error: Database connection not established';
    
    return db;
};