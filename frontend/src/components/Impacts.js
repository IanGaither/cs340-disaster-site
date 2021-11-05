import React from "react";
import Instructions from "../Instructions"
import TableComponent from "../TableComponent";

class Impacts extends React.Component {

    render() {
        return (
            <div className="Impacts">
                <div className="container">
                    <h1>Impacts</h1>
                    <h6>This page is for viewing, editing, adding, and deleting rows to the Impacts Table.</h6>
                    <p>Before creating a row for a specific disaster impact, you need to make sure there are rows for
                        both the impacted community in Communities and the disaster in Disasters.</p>
                    <Instructions/>
                </div>
                <TableComponent source={"impacts"} />
            </div>
        );
    }

}

export default Impacts;