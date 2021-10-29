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

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
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
                    <Badge bg="primary" onClick={this.handleEditClick}>Edit</Badge>
                    <Badge bg="danger" className="mx-1" onClick={this.handleDeleteClick}>Delete</Badge>
                </td>;
                break;
            case "edit":
                buttons = <td>
                    <Badge bg="primary" onClick={this.handleSaveClick}>Save</Badge>
                    <Badge bg="dark" className="mx-1" onClick={this.handleCancelClick}>Cancel</Badge>
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
            <tr onClick={this.handleOnClick}>
                <td hidden>
                    {this.props.id}
                </td>
                {cells}
                {buttons}
            </tr>)
    }

    handleOnClick(event)
    {
        if(this.props.mode === "inactive")
        {
            this.props.handleRowModeUpdate(this.props.rowIndex, "active")
        }
    }

    handleEditClick(event)
    {
        this.props.handleRowModeUpdate(this.props.rowIndex, "edit");
    }

    handleDeleteClick(event)
    {
        this.props.handleRowModeUpdate(this.props.rowIndex, "inactive");
    }

    handleSaveClick(event)
    {
        this.props.handleRowModeUpdate(this.props.rowIndex, "active");
    }

    handleCancelClick(event)
    {
        this.props.handleRowModeUpdate(this.props.rowIndex, "inactive");
    }
}

export default Row;