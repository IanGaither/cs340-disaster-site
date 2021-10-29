import React from 'react'
import Form from 'react-bootstrap/Form'
import { v4 as uuidv4 } from "uuid";

function TextCell(props) {
    return (
        <td>
            {props.editable
                ? <Form.Control type="text" value={props.value} name={props.name} onChange={props.onChange}/>
                : props.value
            }
        </td>);
}

export default TextCell;