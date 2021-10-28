import React from "react";
import TextCell from "./TextCell";
import NumberCell from "./NumberCell"
import StaticSelect from "./StaticSelectCell"
import Badge from "react-bootstrap/Badge"

const components = {
    textCell: TextCell,
    numberCell: NumberCell,
    staticSelect: StaticSelect
};

class Row extends React.Component {
    constructor (props) {
        super(props);
    }

    rowHandleChange = (event) => {
        console.log("in rowHandleChange with");
        console.log(event);
        this.props.tableHandleChange(
            {
                id: this.props.id,
                field: event.target.name,
                value: event.target.value
            }
        )
    };

    render() {
        let editable = this.props.mode === "edit";
        let buttons;
        switch(this.props.mode) {
            case "inactive":
                buttons = <td> </td>;
                break;
            case "active":
                buttons = <td>
                    <Badge bg="primary">Edit</Badge>
                    <Badge bg="danger" className="mx-1">Delete</Badge>
                </td>;
                break;
            case "edit":
                buttons = <td>
                    <Badge bg="primary">Save</Badge>
                    <Badge bg="dark" className="mx-1">Cancel</Badge>
                </td>
        }
        let cells = [];
        for(let i = 0; i < this.props.fieldTypes.length; i++) {
            const CellType = components[this.props.fieldTypes[i]];
            cells.push(
                <CellType {...this.props.fieldAttributes[i]} onChange={this.rowHandleChange} editable={editable}
                          name={this.props.fieldNames[i]} value={this.props[this.props.fieldNames[i]]}/>
            )
        }
        return (
            <tr>
                <td hidden>
                    {this.props.id}
                </td>
                {cells}
                {buttons}
            </tr>)
    }
}

export default Row;