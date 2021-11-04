import React from 'react'
import Form from 'react-bootstrap/Form'

function DateCell(props) {
    return (
        <td>
            {props.editable
                ? <Form.Control type="date" value={props.value} name={props.name} onChange={props.onChange}/>
                : reformatDate(props.value)
            }
        </td>);
}

function reformatDate(date) {
    return date.slice(5, 7) + "-" + date.slice(8, 10) + "-" + date.slice(0, 4)
}

export default DateCell;