import React from "react";
import Instructions from "../Instructions"
import TableComponent from "../TableComponent";

class Hurricanes extends React.Component {

    render() {
        return (
            <div className="Hurricanes">
                <div className="container">
                    <h1>Hurricanes</h1>
                    <h6>This page is for viewing, editing, adding, and deleting rows to the Hurricanes Table.</h6>
                    <Instructions/>
                </div>
                <TableComponent source={"hurricanes"} />
            </div>
        );
    }

}

export default Hurricanes;