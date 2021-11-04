import React from "react";
import Badge from "react-bootstrap/Badge"

import TextCell from "./TextCell";
import NumberCell from "./NumberCell"
import StaticSelect from "./StaticSelectCell"
import DateCell from "./DateCell";

class AddRow extends React.Component {
    constructor(props) {
        super(props);

        let rowDefaults = [];
        for(let column in this.props.headerRow)
        {   
            switch(this.props.headerRow[column].columnType)
            {
                case "text":
                    rowDefaults.push("");
                    break;

                case "static":
                    rowDefaults.push(this.props.headerRow[column].columnConstraints[0].value);
                    break;

                case "number":
                    rowDefaults.push(0);
                    break;

                case "date":
                    rowDefaults.push("");
                    break;
            }
        }

        this.state = {
            editing: false,
            rowValues: this.makeDefaults()
        }
        //bind to instance
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    render() {
        if(this.state.editing)
        {
            //build cells
            let cells = [];
            for(let column in this.props.headerRow)
            {
                switch(this.props.headerRow[column].columnType)
                {
                    case "text":
                        cells.push(<TextCell 
                            key={column} 
                            value={this.state.rowValues[column]}
                            name={this.props.headerRow[column].columnName}
                            editable={true}
                            onChange={this.rowHandleChange}
                        />);
                        break;

                    case "static":
                        cells.push(<StaticSelect 
                            key={column} 
                            value={this.state.rowValues[column]}
                            name={this.props.headerRow[column].columnName}
                            options={this.props.headerRow[column].columnConstraints}
                            editable={true}
                            onChange={this.rowHandleChange}
                        />);
                        break;

                    case "number":
                        cells.push(<NumberCell 
                            key={column + "2"} 
                            value={this.state.rowValues[column]}
                            name={this.props.headerRow[column].columnName}
                            editable={true}
                            onChange={this.rowHandleChange}
                        />);
                        break;

                    case "date":
                        cells.push(<DateCell
                            key={column}
                            value={this.state.rowValues[column]}
                            name={this.props.headerRow[column].columnName}
                            editable={true}
                            onChange={this.rowHandleChange}
                        />);
                        break;
                }
            }
            return(
                <tr>
                    {cells}
                    <td>
                        <Badge bg="primary" onClick={this.handleAddClick}>Add</Badge>
                        <Badge bg="dark" className="mx-1" onClick={this.handleCancelClick}>Cancel</Badge>
                    </td>
                </tr>
            );
        }
        else
        {
            return (
                <tr>
                    <td>
                        <img src="images/plus-circle.svg" alt="" width="25px" onClick={this.handleOnClick} />
                    </td>
                </tr>
            );
        }
    }

    rowHandleChange = (event) => {
        let newRows = JSON.parse(JSON.stringify(this.state.rowValues));
        for(let column in this.props.headerRow)
        {
            if(event.target.name === this.props.headerRow[column].columnName)
            {
                newRows[column] = event.target.value;
            }
        }
        this.setState({rowValues: newRows});
    };

    handleOnClick(event)
    {
        this.props.editNotify(true);
        this.setState({editing: true});
    }

    handleAddClick(event)
    {
        this.props.editNotify(false);
        this.setState({editing: false, rowValues: this.makeDefaults()});
    }

    handleCancelClick(event)
    {
        this.props.editNotify(false);
        this.setState({editing: false, rowValues: this.makeDefaults()});
    }

    makeDefaults()
    {
        let rowDefaults = [];
        for(let column in this.props.headerRow)
        {   
            switch(this.props.headerRow[column].columnType)
            {
                case "text":
                    rowDefaults.push("");
                    break;

                case "static":
                    rowDefaults.push(this.props.headerRow[column].columnConstraints[0].value);
                    break;

                case "number":
                    rowDefaults.push(0);
                    break;

                case "date":
                    rowDefaults.push("");
                    break;
            }
        }
        return rowDefaults;
    }
}

export default AddRow;