import React from 'react'
import Form from 'react-bootstrap/Form'

function NumberCell(props) {
    return (
        <td>
            {props.editable
                ? <Form.Control type="number" value={props.value} name={props.name} onChange={props.onChange}/>
                : props.value
            }
        </td>);
}

export default NumberCell;