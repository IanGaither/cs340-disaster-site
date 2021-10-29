import React from "react";
import HeaderRow from "./HeaderRow";
import Row from "./Row"
import Table from "react-bootstrap/Table"

const rowValues = [
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
];

class TableView extends React.Component {
    constructor(props) {
        super(props);
        //TODO: Restore this after submission
        /*this.state = {
            rowValues: rowValues
        }*/
    }

    tableHandleChange = (change) => {
        //TODO: Restore this after submission
        /*this.setState(prevState => ({
            rowValues: prevState.rowValues.map(
                el => el.id === change.id? { ...el, [change.field]: change.value}: el
            )
        }))*/};

    render() {
        return (
            <div className="container">
            <Table>
                <HeaderRow headers={this.props.headers} buttonRowWidth="150"/>
                <tbody>
                {this.props.rowValues.map((rowValues) =>
                    <Row {...rowValues} key={rowValues.id} tableHandleChange={this.tableHandleChange}
                    fieldTypes={this.props.fieldTypes} fieldNames={this.props.fieldNames} fieldAttributes={this.props.fieldAttributes}/>
                )}
                </tbody>
            </Table>
            </div>)

    }

}

export default TableView;

/* render body with rowValues as state instead of prop
{this.state.rowValues.map((rowValues) =>
                    <Row {...rowValues} key={rowValues.id} tableHandleChange={this.tableHandleChange}
                    fieldTypes={this.props.fieldTypes} fieldNames={this.props.fieldNames} fieldAttributes={this.props.fieldAttributes}/>
                )}
*/