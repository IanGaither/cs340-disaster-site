module.exports = class ResponseTable
{
    constructor()
    {
        this.table = {};
    }

    SetTableTitle(title)
    {
        this.table.title = title;
    }

    SetTableHeaderRow(headerRow)
    {
        this.table.headerRow = headerRow;
    }

    SetTableDataRows(dataRows)
    {
        let rows = [];
        for(let row in dataRows)
        {
            if(dataRows[row].id)
            {
                rows.push({rowID: dataRows[row].id, columns: Object.values(dataRows[row]).slice(1)});
            }
            else
            {
                //hacky specifically for impacts table
                rows.push({rowID: dataRows[row].Community + ' ' + dataRows[row]['Disaster Event'], columns: Object.values(dataRows[row])});
            }
        }
        this.table.dataRows = rows;
    }

    GetResponseTable()
    {
        return this.table;
    }
}