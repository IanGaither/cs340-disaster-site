import React from "react";
import HeaderRow from "./HeaderRow";
import Row from "./Row"
import Table from "react-bootstrap/Table"

const rowValues = [
    {
        id: 1,
        editable: true,
        mode: "inactive",
        name: "Seattle",
        state: 45,
        population: 750000
    },
    {   id: 5,
        editable: false,
        mode: "active",
        name: "Portland",
        state: 44,
        population: 650000
    },
    {   id: 78,
        editable: false,
        mode: "edit",
        name: "Spokane",
        state: 45,
        population: 250000
    }
];

class TableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowValues: rowValues
        }
    }

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
                {this.state.rowValues.map((rowValues) =>
                    <Row {...rowValues} key={rowValues.id} tableHandleChange={this.tableHandleChange}
                    fieldTypes={this.props.fieldTypes} fieldNames={this.props.fieldNames} fieldAttributes={this.props.fieldAttributes}/>
                )}
                </tbody>
            </Table>
            </div>)

    }

}

export default TableView;