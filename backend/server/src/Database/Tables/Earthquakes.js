const ResponseTable = require('../ResponseTable');
const db = require('../database.js').getDB();

const tableName = 'earthquakes';
const headerRow =
[
    {
        columnName: "Disaster Event",
        columnType: "static",
        columnConstraints: []
    },
    {
        columnName: "Date",
        columnType: "date"
    },
    {
        columnName: "Magnitude",
        columnType: "number"
    },
    {
        columnName: "Epicenter Lat",
        columnType: "number"
    },
    {
        columnName: "Epicenter Lon",
        columnType: "number"
    },
    {
        columnName: "Fault Type",
        columnType: "static",
        columnConstraints:
        [
            {
                value: 1,
                label: "Normal"
            },
            {
                value: 2,
                label: "Thrust"
            },
            {
                value: 3,
                label: "Strike-Slip"
            },
            {
                value: 4,
                label: "Oblique"
            }
        ]
    }
];

function Create(req, res)
{
    if(req.body.newRow[0] === 0)
        req.body.newRow[0] = null;

    db.query('INSERT INTO earthquakes (disaster_event_id, date, richter_magnitude, epicenter_latitude, epicenter_longitude, fault_type) \
    VALUES (?, ?, ?, ?, ?, ?);', req.body.newRow)
    .then(function(data)
    {
        res.send('done');
    });
}

function Read(req, res)
{
    let table = new ResponseTable();
    table.SetTableTitle('Earthquakes');
    db.query('SELECT disaster_event_id as id, name AS Name FROM disaster_events')
    .then(function(data)
    {
        //generate dynamic constraints
        let constraints = []
        constraints.push({value: 0, label: 'None'});

        for(let fk in data)
        {
            constraints.push({value: data[fk].id, label: data[fk].Name});
        }
        //insert new constraints based on FK values
        for(let column in headerRow)
        {
            if(headerRow[column].columnName === 'Disaster Event')
            {
                headerRow[column].columnConstraints = constraints;
                table.SetTableHeaderRow(headerRow);
                break;
            }
        }
    })
    .then(function(data)
    {
        return db.query('SELECT earthquake_id as id,\
            IFNULL(disaster_event_id, 0) AS \'Disaster Event\', \
            date AS Date, \
            richter_magnitude AS Magnitude, \
            epicenter_latitude AS \'Epicenter Latitude\',\
            epicenter_longitude AS \'Epicenter Longitude\',\
            fault_type+0 AS \'Fault Type\'\
            FROM earthquakes')
        })
    .then(function(data)
    {
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