import React from "react";
import Instructions from "../Instructions"
import TableComponent from "../TableComponent";

class Disasters extends React.Component {

    render() {
        return (
            <div className="DisasterEvents">
                <div className="container">
                    <h1>Disaster Events</h1>
                    <h6>This page is for viewing, editing, adding, and deleting rows to the DisasterEvents Table.</h6>
                    <Instructions />
                </div>
                <TableComponent source={"disasters"} />
            </div>
        );
    }

}

export default Disasters;