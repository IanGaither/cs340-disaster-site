const dotenv = require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

async function run() 
{
    //wait for async db connection to finish
    const db = require('./src/Database/database')
    await db.connectDB();
    //allows use of default development staging for React
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        next();
    });

    //establish endpoints for each table
    const tableManager = require('./src/Database/table-manager');
    tableManager.InitTableEndpoints(app, process.env.FRONTEND_DB_PATH_ROOT);
    //finish express setup
    app.use(express.static(path.join(__dirname, '../../frontend/build')));
    app.set('port', process.env.SERVER_PORT);
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'))
    });
    //start server
    app.listen(app.get('port'), function () {
        console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
    });
}

run();