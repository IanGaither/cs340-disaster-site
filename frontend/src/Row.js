import React from "react";
import TextCell from "./TextCell";
import NumberCell from "./NumberCell"
import StaticSelect from "./StaticSelectCell"

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
        let cells = [];
        for(let i = 0; i < this.props.fieldTypes.length; i++) {
            const CellType = components[this.props.fieldTypes[i]];
            cells.push(
                <CellType {...this.props.fieldAttributes[i]} onChange={this.rowHandleChange} editable={this.props.editable}
                          name={this.props.fieldNames[i]} value={this.props[this.props.fieldNames[i]]}/>
            )
        }
        return (
            <tr>
                <td hidden>
                    {this.props.id}
                </td>
                {cells}
            </tr>)
    }
}

export default Row;