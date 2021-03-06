const { default: Communities } = require("./Tables/Communities");
const { default: Earthquakes } = require("./Tables/Earthquakes");
const { default: Hurricanes } = require("./Tables/Hurricanes");

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
                    label: "Pick a state"
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

const DisasterEventsTable = 
{
    title: "Disaster Events",
    headerRow:
    [
        {
            columnName: "Name",
            columnType: "text"
        }
    ],
    dataRows:
    [
        {
            rowID: 1,
            columns:
            [
                "Hurricane Harvey"
            ]
        },
        {
            rowID: 2,
            columns:
            [
                "Great Alaska Earthquake"
            ]
        },
        {
            rowID: 3,
            columns:
            [
                "Hurricane Katrina"
            ]
        },
        {
            rowID: 4,
            columns:
            [
                "Northridge Earthquake"
            ]
        }
    ]
}

const EarthquakesTable = 
{
    title: "Earthquakes",
    headerRow:
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
    ],
    dataRows:
    [
        {
            rowID: 1,
            columns:
            [
                2,
                "1964-03-27",
                9.2,
                60.908,
                -147.339,
                1
            ]
        },
        {
            rowID: 2,
            columns:
            [
                4,
                "1994-01-17",
                6.7,
                34.213,
                -118.537,
                2
            ]
        }
    ]
}

const HurricanesTable = 
{
    title: "Hurricanes",
    headerRow:
    [
        {
            columnName: "Disaster Event",
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
    ],
    dataRows:
    [
        {
            rowID: 1,
            columns:
            [
                1,
                "2017-08-17",
                "2017-09-02",
                4,
                134
            ]
        },
        {
            rowID: 2,
            columns:
            [
                3,
                "2005-08-23",
                "2005-08-31",
                5,
                175
            ]
        }
    ]
}

const ImpactsTable = 
{
    title: "Impacts",
    headerRow:
    [
        {
            columnName: "Community",
            columnType: "static",
            columnConstraints:
            [
                {
                    value: -1,
                    label: "Pick a Community"
                },
                {
                    value: 1,
                    label: "Anchorage"
                },
                {
                    value: 5,
                    label: "Houston"
                },
                {
                    value: 78,
                    label: "New Orleans"
                }
            ]
        },
        {
            columnName: "DisasterEvent",
            columnType: "static",
            columnConstraints:
            [
                {
                    value: -1,
                    label: "Pick a DisasterEvent"
                },
                {
                    value: 1,
                    label: "Hurricane Harvey",
                },
                {
                    value: 2,
                    label: "Great Alaska Earthquake",
                },
                {
                    value: 3,
                    label: "Hurricane Katrina",
                },
                {
                    value: 4,
                    label: "Northridge Earthquake"
                }
            ]
        },
        {
            columnName: "Fatalities",
            columnType: "number"
        },
        {
            columnName: "Injuries",
            columnType: "number"
        },
        {
            columnName: "Property Damage",
            columnType: "number"
        },
        {
            columnName: "Relief Cost",
            columnType: "number"
        }
    ],
    dataRows:
    [
        {
            rowID: 1,
            columns:
            [
                5,
                1,
                68,
                300,
                125000000000,
                30000000
            ]
        },
        {
            rowID: 2,
            columns:
            [
                1,
                2,
                131,
                600,
                311000000,
                98000000
            ]
        }
    ]
}

const tables = 
{
    "communities": CommunitiesTable,
    "disasters": DisasterEventsTable,
    "earthquakes": EarthquakesTable,
    "hurricanes": HurricanesTable,
    "impacts": ImpactsTable

}