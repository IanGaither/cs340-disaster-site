import React from "react";

import Row from "./Row"

class TableComponent extends React.Component {
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
            <div className="table-component">
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

export default TableComponent;