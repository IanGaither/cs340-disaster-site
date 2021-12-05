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
        columnType: "number",
        columnConstraints: 
        {
            min: 0,
            max: 15
        }
    },
    {
        columnName: "Epicenter Lat",
        columnType: "number",
        columnConstraints: 
        {
            min: -90,
            max: 90
        }
    },
    {
        columnName: "Epicenter Lon",
        columnType: "number",
        columnConstraints: 
        {
            min: -180,
            max: 180
        }
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
const headerFields = 
[
    {value: 'disaster_event_id', label: 'Disaster Event'},
    {value: 'date', label: 'Date'},
    {value: 'richter_magnitude', label: 'Magnitude'},
    {value: 'epicenter_latitude', label: 'Epicenter Lat'},
    {value: 'epicenter_longitude', label: 'Epicenter Lon'},
    {value: 'fault_type', label: 'Fault Type'},
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
        table.SetTableHeaderFields(headerFields);
        table.SetTableDataRows(data);
        res.send({table: table.GetResponseTable()});
    });
}

function Update(req, res)
{
    let args = req.body.newRow;
    args.push(req.query.row);
    db.query('UPDATE earthquakes SET disaster_event_id = ?, \
    date = ?, \
    richter_magnitude = ?, \
    epicenter_latitude = ?, \
    epicenter_longitude = ?, \
    fault_type = ? \
    WHERE earthquake_id = ?;', args)
    .then(function(data)
    {
        res.send('done')
    });
}

function Delete(req, res)
{
    db.query('DELETE FROM earthquakes WHERE earthquake_id = ?;', req.query.row)
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
            FROM earthquakes \
            WHERE ?? LIKE ?;', args)
        })
    .then(function(data)
    {
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