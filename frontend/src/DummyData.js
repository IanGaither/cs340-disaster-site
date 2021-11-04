const { default: Communities } = require("./components/Communities")

module.exports.GetTable = function(tableName)
{
    return tables[tableName];
}

const CommunitiesTable = 
{
    title: "Communities",
    headerRow:
    [
        {
            columnName: "Name",
            columnType: "text"
        },
        {
            columnName: "State",
            columnType: "static",
            columnConstraints:
            [
                {
                    value: -1,
                    label: "None"
                },
                {
                    value: 1,
                    label: "Alabama"
                },
                {
                    value: 2,
                    label: "Alaska"
                },
                {
                    value: 15,
                    label: "Louisiana"
                },
                {
                    value: 20,
                    label: "Oregon"
                },
                {
                    value: 23,
                    label: "Texas"
                },
                {
                    value: 45,
                    label: "Washington"
                }
            ]
        },
        {
            columnName: "Population",
            columnType: "number"
        }
    ],
    dataRows:
    [
        {
            rowID: 1,
            columns:
            [
                "Anchorage",
                2,
                293531
            ]
        },
        {
            rowID: 5,
            columns:
            [
                "Houston",
                23,
                2304580
            ]
        },
        {
            rowID: 78,
            columns:
            [
                "New Orleans",
                15,
                383997
            ]
        }
    ]
}

const tables = 
{
    "communities": CommunitiesTable,
}