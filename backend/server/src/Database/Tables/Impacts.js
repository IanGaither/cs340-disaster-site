const ResponseTable = require('../ResponseTable');
const db = require('../database.js').getDB();

const tableName = 'impacts';
const headerRow =
[
    {
        columnName: "Community",
        columnType: "static",
        columnConstraints: []
    },
    {
        columnName: "Disaster Event",
        columnType: "static",
        columnConstraints: []
    },
    {
        columnName: "Fatalities",
        columnType: "number",
        columnConstraints: 
        {
            min: 0,
            max: 2147483647
        }
    },
    {
        columnName: "Injuries",
        columnType: "number",
        columnConstraints: 
        {
            min: 0,
            max: 2147483647
        }
    },
    {
        columnName: "Property Damage",
        columnType: "number",
        columnConstraints: 
        {
            min: 0,
            max: 9223372036854775807
        }
    },
    {
        columnName: "Relief Cost",
        columnType: "number",
        columnConstraints: 
        {
            min: 0,
            max: 9223372036854775807
        }
    }
];
const headerFields =
[
    {value: 'community_name', label: 'Community'},
    {value: 'disaster_event_name', label: 'Disaster Event'},
    {value: 'fatality_count', label: 'Fatalities'},
    {value: 'injury_count', label: 'Injuries'},
    {value: 'property_damage', label: 'Property Damage'},
    {value: 'relief_cost', label: 'Relief Cost'}
];

function Create(req, res)
{
    db.query('INSERT INTO impacts (community_id, disaster_event_id, fatality_count, injury_count, property_damage, relief_cost) \
    VALUES (?, ?, ?, ?, ?, ?);', req.body.newRow)
    .then(function(data)
    {
        res.send('done');
    });
}

function Read(req, res)
{
    let table = new ResponseTable();
    table.SetTableTitle('Impacts');
    db.query('SELECT community_id as id, community_name AS Name FROM communities')
    .then(function(data)
    {
        //generate dynamic constraints
        let constraints = []
        constraints.push({value: -1, label: 'Pick a community'});
        
        for(let fk in data)
        {
            constraints.push({value: data[fk].id, label: data[fk].Name});
        }
        //insert new constraints based on FK values
        for(let column in headerRow)
        {
            if(headerRow[column].columnName === 'Community')
            {
                headerRow[column].columnConstraints = constraints;
                break;
            }
        }
    })
    .then(function(data)
    {
        return db.query('SELECT disaster_event_id as id, disaster_event_name AS Name FROM disaster_events')
    })
    .then(function(data)
    {
        //generate dynamic constraints
        let constraints = []
        constraints.push({value: -1, label: 'Pick a disaster event'});

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
        return db.query('SELECT community_id AS Community, \
        disaster_event_id AS \'Disaster Event\', \
        fatality_count AS Fatalities, \
        injury_count AS Injuries, \
        property_damage AS \'Property Damage\', \
        relief_cost AS \'Relief Cost\' \
        FROM impacts');
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
    let ids = req.query.row.split(' ');
    let args = req.body.newRow.concat(ids);

    db.query('UPDATE impacts SET community_id = ?, \
    disaster_event_id = ?, \
    fatality_count = ?, \
    injury_count = ?, \
    property_damage = ?, \
    relief_cost = ? \
    WHERE community_id = ? AND disaster_event_id = ?;', args)
    .then(function(data)
    {
        res.send('done')
    });
}

function Delete(req, res)
{
    let ids = req.query.row.split(' ');
    
    db.query('DELETE FROM impacts WHERE community_id = ? AND disaster_event_id = ?;', ids)
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
    table.SetTableTitle('Impacts');
    db.query('SELECT community_id as id, community_name AS Name FROM communities')
    .then(function(data)
    {
        //generate dynamic constraints
        let constraints = []
        constraints.push({value: -1, label: 'Pick a community'});
        
        for(let fk in data)
        {
            constraints.push({value: data[fk].id, label: data[fk].Name});
        }
        //insert new constraints based on FK values
        for(let column in headerRow)
        {
            if(headerRow[column].columnName === 'Community')
            {
                headerRow[column].columnConstraints = constraints;
                break;
            }
        }
    })
    .then(function(data)
    {
        return db.query('SELECT disaster_event_id as id, disaster_event_name AS Name FROM disaster_events')
    })
    .then(function(data)
    {
        //generate dynamic constraints
        let constraints = []
        constraints.push({value: -1, label: 'Pick a disaster event'});

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
        return db.query('SELECT community_id AS Community, \
        disaster_event_id AS \'Disaster Event\', \
        fatality_count AS Fatalities, \
        injury_count AS Injuries, \
        property_damage AS \'Property Damage\', \
        relief_cost AS \'Relief Cost\' \
        FROM (communities INNER JOIN impacts USING(community_id) INNER JOIN disaster_events USING(disaster_event_id)) \
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