const db = require('../database.js');

const tableName = 'impacts';

module.exports.register = function(app, root)
{
    app.post(root + tableName, Create);
    app.get(root + tableName, Read);
    app.put(root + tableName, Update);
    app.delete(root + tableName, Delete);
}


function Create(req, res)
{

}

function Read(req, res)
{
    
}

function Update(req, res)
{

}

function Delete(req, res)
{

}