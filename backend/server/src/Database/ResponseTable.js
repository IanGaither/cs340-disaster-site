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
            rows.push({rowID: dataRows[row].id, columns: Object.values(dataRows[row]).slice(1)});
        }
        this.table.dataRows = rows;
    }

    GetResponseTable()
    {
        return this.table;
    }
}