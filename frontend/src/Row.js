import React from "react";
import TextCell from "./TextCell";
import NumberCell from "./NumberCell"
import StaticSelect from "./StaticSelectCell"
import DateCell from "./DateCell"
import Badge from "react-bootstrap/Badge"

class Row extends React.Component {
    constructor (props) {
        super(props);

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    render() {
        //set mode
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
        //build cells
        let cells = [];
        for(let column in this.props.columns)
        {
            switch(this.props.headerRow[column].columnType)
            {
                case "text":
                    cells.push(<TextCell 
                        key={column} 
                        value={this.props.columns[column]}
                        name={this.props.headerRow[column].columnName}
                        editable={editable}
                        onChange={this.rowHandleChange}
                    />);
                    break;

                case "static":
                    cells.push(<StaticSelect 
                        key={column} 
                        value={this.props.columns[column]}
                        name={this.props.headerRow[column].columnName}
                        options={this.props.headerRow[column].columnConstraints}
                        editable={editable}
                        onChange={this.rowHandleChange}
                    />);
                    break;

                case "number":
                    cells.push(<NumberCell 
                        key={column} 
                        value={this.props.columns[column]}
                        name={this.props.headerRow[column].columnName}
                        options={this.props.headerRow[column].columnConstraints}
                        editable={editable}
                        onChange={this.rowHandleChange}
                    />);
                    break;

                case "date":
                    cells.push(<DateCell
                        key={column}
                        value={this.props.columns[column]}
                        name={this.props.headerRow[column].columnName}
                        editable={editable}
                        onChange={this.rowHandleChange}
                    />);
                    break;
            }
        }
        
        return (
            <tr onClick={this.handleOnClick} onMouseOver={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <td hidden>
                    {this.props.id}
                </td>
                {cells}
                {buttons}
            </tr>)
    }

    rowHandleChange = (event) => {
        this.props.tableHandleChange(
            {
                rowID: this.props.rowID,
                rowIndex: this.props.rowIndex,
                field: event.target.name,
                value: event.target.value
            }
        )
    };

    handleEditClick(event)
    {
        this.props.handleRowModeUpdate(this.props.rowIndex, "edit");
    }

    handleDeleteClick(event)
    {
        // this.props.handleRowModeUpdate(this.props.rowIndex, "inactive");
        this.props.handleDeleteRow(this.props.rowID, this.props.rowIndex)
    }

    handleSaveClick(event)
    {
        // this.props.handleRowModeUpdate(this.props.rowIndex, "active");
        this.props.handleUpdateRow(this.props.rowID, this.props.rowIndex)
    }

    handleCancelClick(event)
    {
        this.props.handleRowModeUpdate(this.props.rowIndex, "inactive");
    }

    handleMouseEnter = (event) => {
        this.props.handleMouseEnter(this.props.rowIndex)
    };

    handleMouseLeave = (event) => {
        this.props.handleMouseLeave(this.props.rowIndex)
    };

    handleMouseClick = (event) => {
        this.props.handleMouseClick(this.props.rowIndex)
    };
}

export default Row;