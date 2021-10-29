import React from "react";
import { v4 as uuidv4 } from "uuid";

function HeaderRow(props) {
    return <thead><tr>{
        props.headers.map((header) =>  <th key={uuidv4()} >{header}</th> ) }
        <th width={ props.buttonRowWidth }> </th>
        </tr></thead>
}


export default HeaderRow;