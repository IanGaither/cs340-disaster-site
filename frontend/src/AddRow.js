import React from "react";
import Badge from "react-bootstrap/Badge"
import { v4 as uuidv4 } from "uuid";

import TextCell from "./TextCell";
import NumberCell from "./NumberCell"
import StaticSelect from "./StaticSelectCell"

const components = {
    textCell: TextCell,
    numberCell: NumberCell,
    staticSelect: StaticSelect
};

class AddRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        }
        //bind to instance
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    render() {
        if(this.state.editing)
        {
            let cells = [];
            for(let i = 0; i < this.props.fieldTypes.length; i++) {
                const CellType = components[this.props.fieldTypes[i]];
                cells.push(
                    <CellType {...this.props.fieldAttributes[i]} key={i} onChange={this.rowHandleChange} editable={true}
                              name={this.props.fieldNames[i]} value={this.props[this.props.fieldNames[i]]}/>
                )
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
        this.props.tableHandleChange(
            {
                id: this.props.id,
                field: event.target.name,
                value: event.target.value
            }
        )
    };

    handleOnClick(event)
    {
        this.setState({editing: true});
    }

    handleAddClick(event)
    {
        this.setState({editing: false});
    }

    handleCancelClick(event)
    {
        this.setState({editing: false});
    }
}

export default AddRow;