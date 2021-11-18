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
        columnType: "number"
    },
    {
        columnName: "Max Wind Speed",
        columnType: "number"
    }
];

function Create(req, res)
{
    
}

function Read(req, res)
{
    let table = new ResponseTable();
    table.SetTableTitle('Hurricanes');
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