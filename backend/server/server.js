const config = require("./config.js");
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.set('port', process.argv[2]);


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'))
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});