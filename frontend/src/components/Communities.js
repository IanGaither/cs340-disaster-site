import React from "react";
import Instructions from "../Instructions"
import TableComponent from "../TableComponent";

class Communities extends React.Component {

    render() {
        return (
            <div className="Communities">
                <div className="container">
                    <h1>Communities</h1>
                    <h6>This page is for viewing, editing, adding, and deleting rows to the Communities Table.</h6>
                    <Instructions />
                </div>
                <TableComponent source={"communities"} />
            </div>
        );
    }

}

export default Communities;