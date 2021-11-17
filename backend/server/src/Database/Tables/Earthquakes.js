const ResponseTable = require('../ResponseTable');
const db = require('../database.js').getDB();

const tableName = 'earthquakes';
const headerRow =
[
    {
        columnName: "DisasterEvent",
        columnType: "static",
        columnConstraints:
        [
            {
                value: -1,
                label: "None"
            },
            {
                value: 1,
                label: "Hurricane Harvey"
            },
            {
                value: 2,
                label: "Great Alaska Earthquake"
            },
            {
                value: 3,
                label: "Hurricane Katrina"
            },
            {
                value: 4,
                label: "Northridge Earthquake"
            }
        ]
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
    
}

function Read(req, res)
{
    db.query('SELECT earthquake_id as id,\
    disaster_events.name AS \'Disaster Event\', \
    date AS Date, \
    richter_magnitude AS Magnitude, \
    epicenter_latitude AS \'Epicenter Latitude\',\
    epicenter_longitude AS \'Epicenter Longitude\',\
    fault_type+0 AS \'Fault Type\'\
    FROM earthquakes\
    LEFT JOIN disaster_events ON earthquakes.disaster_event_id = disaster_events.disaster_event_id;')
    .then(function(data)
    {
        let table = new ResponseTable();
        table.SetTableTitle('Earthquakes');
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