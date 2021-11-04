import React from "react";
import Card from "react-bootstrap/Card";

import TableComponent from "../TableComponent";

class Hurricanes extends React.Component {

    render() {
        return (
            <div className="Hurricanes">
                <div className="container">
                    <h1>Hurricanes</h1>
                    <h6>This page is for viewing, editing, adding, and deleting rows to the Hurricanes Table.</h6>
                    <Card className="mb-4">
                        <Card.Body className="Body">
                            <Card.Text className="Text">
                                <p className="mb-0">To edit or delete a row, click on it and "Edit" and "Delete" buttons will appear.</p>
                                <p className="mb-0">If you click the "Edit" button, the row will become editable and "Save" and "Cancel will appear.</p>
                                <p className="mb-0">To add a row, click the "+" button below the table and a form will appear for adding new rows.</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <TableComponent source={"hurricanes"} />
            </div>
        );
    }

}

export default Hurricanes;