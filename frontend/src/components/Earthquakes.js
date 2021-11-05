import React from "react";
import Instructions from "../Instructions"
import TableComponent from "../TableComponent";

class Earthquakes extends React.Component {

    render() {
        return (
            <div className="Earthquakes">
                <div className="container">
                    <h1>Earthquakes</h1>
                    <h6>This page is for viewing, editing, adding, and deleting rows to the Earthquakes Table.</h6>
                    <Instructions />
                </div>
                <TableComponent source={"earthquakes"} />
            </div>
        );
    }

}

export default Earthquakes;