import React from 'react'
import Form from 'react-bootstrap/Form'

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