const ResponseTable = require('../ResponseTable');
const db = require('../database.js').getDB();

const tableName = 'hurricanes';
const headerRow =
[
    {
        columnName: "Disaster Event",
        columnType: "static",
        columnConstraints: []
    },
    {
        columnName: "Start Date",
        columnType: "date"
    },
    {
        columnName: "End Date",
        columnType: "date"
    },
    {
        columnName: "Category",
        columnType: "static",
        columnConstraints:
        [
            {
                value: 1,
                label: 1
            },
            {
                value: 2,
                label: 2
            },
            {
                value: 3,
                label: 3
            },
            {
                value: 4,
                label: 4
            },
            {
                value: 5,
                label: 5
            }
        ]
    },
    {
        columnName: "Max Wind Speed",
        columnType: "number",
        columnConstraints: 
        {
            min: 0,
            max: 2147483647
        }
        
    }
];
const headerFields = 
[
    {value: 'disaster_event_name', label: 'Disaster Event'},
    {value: 'start_date', label: 'Start Date'},
    {value: 'end_date', label: 'End Date'},
    {value: 'saffir_simpson_category', label: 'Category'},
    {value: 'max_wind_speed', label: 'Max Wind Speed'}
];

function Create(req, res)
{
    if(req.body.newRow[0] === 0)
    req.body.newRow[0] = null;

    db.query('INSERT INTO hurricanes (disaster_event_id, start_date, end_date, saffir_simpson_category, max_wind_speed) \
    VALUES (?, ?, ?, ?, ?);', req.body.newRow)
    .then(function(data)
    {
        res.send('done');
    });
}

function Read(req, res)
{
    let table = new ResponseTable();
    table.SetTableTitle('Hurricanes');
    db.query('SELECT disaster_event_id as id, disaster_event_name AS Name FROM disaster_events')
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
        return db.query('SELECT hurricane_id as id, \
        IFNULL(disaster_event_id, 0) AS \'Disaster Event\', \
        start_date AS \'Start Date\',\
        end_date AS \'End Date\',\
        saffir_simpson_category AS Category,\
        max_wind_speed AS \'Max Wind Speed\' \
        FROM hurricanes');
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
    db.query('UPDATE hurricanes SET disaster_event_id = ?, \
    start_date = ?, \
    end_date = ?, \
    saffir_simpson_category = ?, \
    max_wind_speed = ? \
    WHERE hurricane_id = ?;', args)
    .then(function(data)
    {
        res.send('done')
    });
}

function Delete(req, res)
{
    db.query('DELETE FROM hurricanes WHERE hurricane_id = ?;', req.query.row)
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
    table.SetTableTitle('Hurricanes');
    db.query('SELECT disaster_event_id as id, disaster_event_name AS Name FROM disaster_events')
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
        return db.query('SELECT hurricane_id as id, \
        IFNULL(disaster_event_id, 0) AS \'Disaster Event\', \
        start_date AS \'Start Date\',\
        end_date AS \'End Date\',\
        saffir_simpson_category AS Category,\
        max_wind_speed AS \'Max Wind Speed\' \
        FROM (hurricanes LEFT JOIN disaster_events USING(disaster_event_id)) \
        WHERE ?? LIKE ?', args);
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