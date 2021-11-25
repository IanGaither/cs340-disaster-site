import React from 'react'
import Form from 'react-bootstrap/Form'

function NumberCell(props) {
    return (
        <td>
            {props.editable
                ? <div>
                    <Form.Group className="position-relative">
                        <Form.Control 
                            type="number" 
                            value={props.value} 
                            name={props.name} 
                            onChange={props.onChange}
                            isInvalid={!props.value || props.value < props.options.min || props.value > props.options.max}/>
                        <Form.Control.Feedback type='invalid' tooltip>
                            Please enter a value between {props.options.min} and {props.options.max}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
                : props.value
            }
        </td>);
}

export default NumberCell;