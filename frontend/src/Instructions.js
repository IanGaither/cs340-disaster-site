import Card from "react-bootstrap/Card";
import React from "react";


function Instructions(props) {
    return (
        <Card className="mb-4">
            <Card.Body className="Body">
                <Card.Text className="Text">
                    <p className="mb-0">To edit or delete a row, hover over it or tap on it and "Edit" and "Delete" buttons will appear.</p>
                    <p className="mb-0">If you click the "Edit" button, the row will become editable and "Save" and "Cancel will appear.</p>
                    <p className="mb-0">To add a row, click the "+" button below the table and a form will appear for adding new rows.</p>
                    <p className="mb-0">Once a row is open for editing, you must save it or cancel before editing or adding any other rows.</p>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Instructions;