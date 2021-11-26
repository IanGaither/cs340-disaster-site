import React from "react";
import Table from "react-bootstrap/Table";

import DatabaseInterface from "./DatabaseInterface";

import AddRow from "./AddRow";
import HeaderRow from "./HeaderRow";
import Row from "./Row"


class TableComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRow: -1, 
            addEditing: false,
            editRow: [],
        };
        //bind to instance
        this.handleRowModeUpdate = this.handleRowModeUpdate.bind(this);
        this.fetchTableData = this.fetchTableData.bind(this);
        this.isEditingAdd = this.isEditingAdd.bind(this);
        this.handleUpdateRow = this.handleUpdateRow.bind(this);
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
    }

    render() {
        return (
            <div className="container">
            <Table>
                {this.state.headerRow &&
                <HeaderRow headers={this.state.headerRow} buttonRowWidth="150"/>}
                <tbody>
                    {this.state.dataRows &&
                        this.state.dataRows.map((row, i) =>
                            (this.state.rowModes[i] === 'edit') ?
                            <Row 
                                key={row.rowID}
                                rowID={row.rowID}
                                rowIndex={i} 
                                mode={this.state.rowModes[i]} 
                                headerRow={this.state.headerRow} 
                                columns={this.state.editRow}
                                tableHandleChange={this.tableHandleChange}
                                handleRowModeUpdate={this.handleRowModeUpdate}
                                handleUpdateRow={this.handleUpdateRow}
                                handleDeleteRow={this.handleDeleteRow}
                                handleMouseEnter={this.handleMouseEnter}
                                handleMouseLeave={this.handleMouseLeave}
                                handleMouseClick={this.handleMouseClick}
                            />
                            : <Row 
                            key={row.rowID}
                            rowID={row.rowID}
                            rowIndex={i} 
                            mode={this.state.rowModes[i]} 
                            headerRow={this.state.headerRow} 
                            columns={row.columns}
                            tableHandleChange={this.tableHandleChange}
                            handleRowModeUpdate={this.handleRowModeUpdate}
                            handleUpdateRow={this.handleUpdateRow}
                            handleDeleteRow={this.handleDeleteRow}
                            handleMouseEnter={this.handleMouseEnter}
                            handleMouseLeave={this.handleMouseLeave}
                            handleMouseClick={this.handleMouseClick}
                        />
                        )
                    }
                    {this.state.dataRows &&
                    <AddRow 
                        headerRow={this.state.headerRow} 
                        editing={this.state.addEditing}
                        editNotify={this.isEditingAdd}
                        handleAddRow={this.handleAddRow}
                    />}
                </tbody>
            </Table>
            </div>)

    }

    componentDidMount()
    {
        this.fetchTableData();
    }

    fetchTableData()
    {
        DatabaseInterface.Read(this.props.source)
        .then((response) => 
        {
            let rowModes = [];
            for(let i = 0; i < response.data.table.dataRows.length; i++)
            {
                rowModes.push("inactive");
            }
            this.setState({
                title: response.data.table.title,
                headerRow: response.data.table.headerRow,
                dataRows: response.data.table.dataRows,
                rowModes: rowModes,
                activeRow: -1, 
                addEditing: false,
            });
        });
    }

    tableHandleChange = (change) => {
        let newRow = JSON.parse(JSON.stringify(this.state.editRow));
        //find column
        let columnIndex = 0;
        for(let column in this.state.headerRow)
        {
            if(change.field === this.state.headerRow[column].columnName)
            {
                columnIndex = column;
                break;
            }
        }

        newRow[columnIndex] = change.value
        this.setState({editRow: newRow});
    }

    handleRowModeUpdate(rowIndex, newMode)
    {
        //duplicate state
        const newRowModes = this.state.rowModes.slice();
        //modify old active row
        if(this.state.activeRow !== -1 && rowIndex !== this.state.activeRow)
        {
            newRowModes[this.state.activeRow] = "inactive"
        }
        //update new row
        newRowModes[rowIndex] = newMode;

        if(newMode === "inactive")
            this.setState({rowModes: newRowModes, activeRow: -1});
        else if(newMode === 'edit')
        {
            let newEditRow = [];
            for(let column in this.state.dataRows[rowIndex].columns)
            {
                newEditRow.push(this.state.dataRows[rowIndex].columns[column]);
            }
            this.setState({rowModes: newRowModes, activeRow: rowIndex, editRow: newEditRow});
        }
        else
            this.setState({rowModes: newRowModes, activeRow: rowIndex});
        
    }

    handleMouseEnter = (rowIndex) => {
        if(!this.state.addEditing && (this.state.activeRow === -1 || this.state.rowModes[this.state.activeRow] === "active")) {
            this.handleRowModeUpdate(rowIndex, "active");
        }
    };

    handleMouseLeave = (rowIndex) => {
        if(this.state.rowModes[rowIndex] === "active") {
            this.handleRowModeUpdate(rowIndex, "inactive");
        }
    }

    handleMouseClick = (rowIndex) => {
        if(!this.state.addEditing && (this.state.activeRow === -1 || this.state.rowModes[this.state.activeRow] === "active"))
            this.handleRowModeUpdate(rowIndex, "active");
    }

    isEditingAdd(editingStatus)
    {
        if(this.state.activeRow === -1)
            this.setState({addEditing: editingStatus})
    }

    handleAddRow = (rowValues) => {
        rowValues = this.validateRow(rowValues);
        if(rowValues)
        {
            this.isEditingAdd(false)
            DatabaseInterface.Create(this.props.source, rowValues)
            .then((response) =>
            {
                this.fetchTableData();
            });
        }
    }

    handleUpdateRow(rowID, rowIndex)
    {
        let rowValues = this.validateRow(this.state.editRow);
        if(rowValues)
        {
            this.handleRowModeUpdate(rowIndex, "active");
            DatabaseInterface.Update(this.props.source, rowID, rowValues)
            .then((response) =>
            {
                this.fetchTableData();
            });
        }
    }

    handleDeleteRow(rowID, rowIndex)
    {
        this.handleRowModeUpdate(rowIndex, "inactive");
        DatabaseInterface.Delete(this.props.source, rowID)
        .then((response) => {
            this.fetchTableData();
        });
    }

    validateRow = (rowValues) =>
    {
        for(let column in rowValues)
        {
            switch(this.state.headerRow[column].columnType)
            {
                case 'static':
                    if(rowValues[column] === -1)
                        rowValues[column] = null;
                    break;
                case 'number':
                    if(typeof rowValues[column] === 'undefined' || 
                        rowValues[column] < this.state.headerRow[column].columnConstraints.min ||
                        rowValues[column] > this.state.headerRow[column].columnConstraints.max)
                    {
                        return null;
                    }
                    break;
                case 'text':
                    break;
            }
        }
        return rowValues;
    }
}

export default TableComponent;