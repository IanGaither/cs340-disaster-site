const ResponseTable = require('../ResponseTable');
const db = require('../database.js').getDB();

const stateEnum = 
[
    {
        value: -1,
        label: 'Pick a state'
    },
    {
        value: 1,
        label: 'AK'
    },
    {
        value: 2,
        label: 'AL'
    },
    {
        value: 3,
        label: 'AR'
    },
    {
        value: 4,
        label: 'AZ'
    },
    {
        value: 5,
        label: 'CA'
    },
    {
        value: 6,
        label: 'CO'
    },
    {
        value: 7,
        label: 'CT'
    },
    {
        value: 8,
        label: 'DE'
    },
    {
        value: 9,
        label: 'DC'
    },
    {
        value: 10,
        label: 'FL'
    },
    {
        value: 11,
        label: 'GA'
    },
    {
        value: 12,
        label: 'HI'
    },
    {
        value: 13,
        label: 'IA'
    },
    {
        value: 14,
        label: 'ID'
    },
    {
        value: 15,
        label: 'IL'
    },
    {
        value: 16,
        label: 'IN'
    },
    {
        value: 17,
        label: 'KS'
    },
    {
        value: 18,
        label: 'KY'
    },
    {
        value: 19,
        label: 'LA'
    },
    {
        value: 20,
        label: 'MA'
    },
    {
        value: 21,
        label: 'MD'
    },
    {
        value: 22,
        label: 'ME'
    },
    {
        value: 23,
        label: 'MI'
    },
    {
        value: 24,
        label: 'MN'
    },
    {
        value: 25,
        label: 'MO'
    },
    {
        value: 26,
        label: 'MS'
    },
    {
        value: 27,
        label: 'MT'
    },
    {
        value: 28,
        label: 'NC'
    },
    {
        value: 29,
        label: 'ND'
    },
    {
        value: 30,
        label: 'NE'
    },
    {
        value: 31,
        label: 'NH'
    },
    {
        value: 32,
        label: 'NJ'
    },
    {
        value: 33,
        label: 'NM'
    },
    {
        value: 34,
        label: 'NV'
    },
    {
        value: 35,
        label: 'NY'
    },
    {
        value: 36,
        label: 'OH'
    },
    {
        value: 37,
        label: 'OK'
    },
    {
        value: 38,
        label: 'OR'
    },
    {
        value: 39,
        label: 'PA'
    },
    {
        value: 40,
        label: 'RI'
    },
    {
        value: 41,
        label: 'SC'
    },
    {
        value: 42,
        label: 'SD'
    },
    {
        value: 43,
        label: 'TN'
    },
    {
        value: 44,
        label: 'TX'
    },
    {
        value: 45,
        label: 'UT'
    },
    {
        value: 46,
        label: 'VA'
    },
    {
        value: 47,
        label: 'VT'
    },
    {
        value: 48,
        label: 'WA'
    },
    {
        value: 49,
        label: 'WI'
    },
    {
        value: 50,
        label: 'WV'
    },
    {
        value: 51,
        label: 'WY'
    }
];
/*['Pick a state', 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS',
'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
Keeping this just in case above method doesn't work for now*/

const tableName = 'communities';
const headerRow = [
    {
        columnName: "Name",
        columnType: "text"
    },
    {
        columnName: "State",
        columnType: "static",
        columnConstraints: stateEnum,
    },
    {
        columnName: "Population",
        columnType: "number",
        columnConstraints: 
        {
            min: 0,
            max: 2147483647
        }
    }
];


function Create(req, res)
{
    db.query('INSERT INTO communities (name, state, population) VALUES (?, ?, ?);', req.body.newRow)
    .then(function(data)
    {
        res.send('done');
    });
}

function Read(req, res)
{
    db.query('SELECT community_id as id, name AS Name, state+0 AS State, population AS Population FROM ' + tableName)
    .then(function(data)
    {
        let table = new ResponseTable();
        table.SetTableTitle('Communities');
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