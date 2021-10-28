import React from "react";

function HeaderRow(props) {
    return <thead><tr>{
        props.headers.map((header) =>  <th>{header}</th> ) }
        <th width={ props.buttonRowWidth }> </th>
        </tr></thead>
}


export default HeaderRow;