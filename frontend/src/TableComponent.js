import React from "react";
import Table from "react-bootstrap/Table";

import AddRow from "./AddRow";
import HeaderRow from "./HeaderRow";
import Row from "./Row"

import { GetTable } from "./DummyData";

class TableComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {activeRow: -1};
        //bind to instance
        this.handleRowModeUpdate = this.handleRowModeUpdate.bind(this);
        this.fetchTableData = this.fetchTableData.bind(this);
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
                        />
                    )
                }
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
            //rawData.dataRows[row].mode = "inactive";
        }
        this.setState({
            title: rawData.title,
            headerRow: rawData.headerRow,
            dataRows: rawData.dataRows,
            rowModes: rowModes,
        });
    }

    tableHandleChange = (change) => {
        /*if(change.id === this.state.addValues.id)
        {
            let newAddValueRow = JSON.parse(JSON.stringify(this.state.addValues));
            newAddValueRow[change.field] = change.value;
            this.setState({addValues: newAddValueRow});
        }
        else
        {*/
            let newRows = JSON.parse(JSON.stringify(this.state.dataRows));
            //find column
            let index = 0;
            for(let column in this.state.headerRow)
            {
                if(change.field === this.state.headerRow[column].columnName)
                {
                    console.log(index);
                    index = column;
                    break;
                }
            }
            for(let row in newRows)
            {
                if(newRows[row].rowID === change.rowID)
                {
                    newRows[row].columns[index] = change.value;
                    break;
                }
            }
            
            this.setState({dataRows: newRows});

            /*console.log(change);
            console.log(this.state.dataRows)
            this.setState(prevState => {
                console.log("HI");
                

                return {
                ...prevState,
                dataRows: prevState.dataRows.map(
                    el => el.rowID === change.rowID? { ...el, [index]: change.value}: el
                )
            }})
        //}*/
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
}

export default TableComponent;