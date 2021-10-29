import React from "react";
import Table from "react-bootstrap/Table";
import { v4 as uuidv4 } from "uuid";

import HeaderRow from "./HeaderRow";
import Row from "./Row"

/*const rowValues = [
    {
        id: 1,
        mode: "inactive",
        name: "Seattle",
        state: 45,
        population: 750000
    },
    {   id: 5,
        mode: "active",
        name: "Portland",
        state: 44,
        population: 650000
    },
    {   id: 78,
        mode: "edit",
        name: "Spokane",
        state: 45,
        population: 250000
    }
];*/

class TableView extends React.Component {
    constructor(props) {
        super(props);

        //bind to instance
        this.handleRowModeUpdate = this.handleRowModeUpdate.bind(this);
    }

    state = {
        rowValues: this.props.rowValues,
        activeRow: -1
    };

    tableHandleChange = (change) => {
        this.setState(prevState => ({
            rowValues: prevState.rowValues.map(
                el => el.id === change.id? { ...el, [change.field]: change.value}: el
            )
        }))};

    render() {
        return (
            <div className="container">
            <Table>
                <HeaderRow headers={this.props.headers} buttonRowWidth="150"/>
                <tbody>
                {this.state.rowValues.map((rowValues, i) =>
                    <Row {...rowValues} 
                        key={uuidv4()} 
                        rowIndex={i} 
                        tableHandleChange={this.tableHandleChange}
                        handleRowModeUpdate={this.handleRowModeUpdate}
                        fieldTypes={this.props.fieldTypes} 
                        fieldNames={this.props.fieldNames} 
                        fieldAttributes={this.props.fieldAttributes}/>
                )}
                </tbody>
            </Table>
            </div>)

    }

    handleRowModeUpdate(rowIndex, newMode)
    {
        //duplicate state
        const newRowValues = this.state.rowValues.slice();
        //modify old active row
        if(this.state.activeRow !== -1 && rowIndex !== this.state.activeRow)
        {
            newRowValues[this.state.activeRow].mode = "inactive"
        }
        //update new row
        newRowValues[rowIndex].mode = newMode;

        if(newMode === "inactive")
            this.setState({rowValues: newRowValues, activeRow: -1});
        else
            this.setState({rowValues: newRowValues, activeRow: rowIndex});
        
    }
}

export default TableView;