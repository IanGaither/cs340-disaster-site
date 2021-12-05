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
const headerFields = 
[
    {value: 'name', label: 'Name'}
];

function Create(req, res)
{
    db.query('INSERT INTO disaster_events (name) VALUES (?);', req.body.newRow)
    .then(function(data)
    {
        res.send('done');
    });
}

function Read(req, res)
{
    db.query('SELECT disaster_event_id as id, name AS Name FROM ' + tableName)
    .then(function(data)
    {
        let table = new ResponseTable();
        table.SetTableTitle('Disaster Events');
        table.SetTableHeaderRow(headerRow);
        table.SetTableHeaderFields(headerFields);
        table.SetTableDataRows(data);
        res.send({table: table.GetResponseTable()});
    });
}

function Update(req, res)
{
    let args = req.body.newRow;
    args.push(req.query.row);
    db.query('UPDATE disaster_events SET name = ? \
    WHERE disaster_event_id = ?;', args)
    .then(function(data)
    {
        res.send('done')
    });
}

function Delete(req, res)
{
    db.query('DELETE FROM disaster_events WHERE disaster_event_id = ?;', req.query.row)
    .then(function(data)
    {
        res.send('done')
    });
}

function Search(req, res)
{
    let args = [req.query.field]
    let val = '%' + req.query.value + '%';
    args.push(val);

    db.query('SELECT disaster_event_id as id, name AS Name FROM ' + tableName + ' \
    WHERE ?? LIKE ?;', args)
    .then(function(data)
    {
        let table = new ResponseTable();
        table.SetTableTitle('Disaster Events');
        table.SetTableHeaderRow(headerRow);
        table.SetTableHeaderFields(headerFields);
        table.SetTableDataRows(data);
        res.send({table: table.GetResponseTable()});
    });
}


module.exports.register = function(app, root)
{
    app.post(root + tableName, Create);
    app.get(root + tableName, Read);
    app.put(root + tableName, Update);
    app.delete(root + tableName, Delete);
    app.get(root + tableName + '/search', Search);
}