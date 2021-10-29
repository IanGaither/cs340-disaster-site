import React from 'react'
import FormSelect from 'react-bootstrap/FormSelect'

function StaticSelectCell(props) {
    const selectedText = props.options.filter(opt => opt.value === parseInt(props.value))[0].label;
    let options = props.options.map((opt)=>
        <option key={ opt.value } value={ opt.value } label={ opt.label }>
        </option> );
    return (
        <td>
            {
                props.editable
                ? <FormSelect name={props.name} defaultValue={props.value} onChange={props.onChange}>
                        {options}
                </FormSelect>
                : selectedText
            }
        </td>
    )
}

export default StaticSelectCell;