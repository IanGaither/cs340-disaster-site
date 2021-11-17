const ResponseTable = require('../ResponseTable');
const db = require('../database.js').getDB();

const tableName = 'disaster_events';
const headerRow =
[
    {
        columnName: "Name",
        columnType: "text"
    }
];

function Create(req, res)
{
    
}

function Read(req, res)
{
    db.query('SELECT disaster_event_id as id, name AS Name FROM ' + tableName)
    .then(function(data)
    {
        let table = new ResponseTable();
        table.SetTableTitle('Disaster Events');
        table.SetTableHeaderRow(headerRow);
        table.SetTableDataRows(data);
        res.send({table: table.GetResponseTable()});
    });
}

function Update(req, res)
{

}

function Delete(req, res)
{

}


module.exports.register = function(app, root)
{
    app.post(root + tableName, Create);
    app.get(root + tableName, Read);
    app.put(root + tableName, Update);
    app.delete(root + tableName, Delete);
}