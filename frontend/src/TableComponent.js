import React from "react";
import Table from "react-bootstrap/Table";

import AddRow from "./AddRow";
import HeaderRow from "./HeaderRow";
import Row from "./Row"

import { GetTable } from "./DummyData";

class TableComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRow: -1, 
            addEditing: false
        };
        //bind to instance
        this.handleRowModeUpdate = this.handleRowModeUpdate.bind(this);
        this.fetchTableData = this.fetchTableData.bind(this);
        this.isEditingAdd = this.isEditingAdd.bind(this);
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
                            <Row 
                                key={row.rowID}
                                rowID={row.rowID}
                                rowIndex={i} 
                                mode={this.state.rowModes[i]} 
                                headerRow={this.state.headerRow} 
                                columns={row.columns}
                                tableHandleChange={this.tableHandleChange}
                                handleRowModeUpdate={this.handleRowModeUpdate}
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
                    />}
                </tbody>
            </Table>
            </div>)

    }

    componentDidMount()
    {
        this.fetchTableData(this.props.source);
    }

    fetchTableData(source)
    {
        //add mode to rows, will cause rows to deselect on changing tables
        let rawData = GetTable(source);
        let rowModes = [];
        for(let row in rawData.dataRows)
        {
            rowModes.push("inactive");
        }
        this.setState({
            title: rawData.title,
            headerRow: rawData.headerRow,
            dataRows: rawData.dataRows,
            rowModes: rowModes,
        });
    }

    tableHandleChange = (change) => {
        let newRows = JSON.parse(JSON.stringify(this.state.dataRows));
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

        newRows[change.rowIndex].columns[columnIndex] = change.value;
            
        this.setState({dataRows: newRows});
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
}

export default TableComponent;