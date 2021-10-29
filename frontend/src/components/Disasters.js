import React from "react";
import Card from "react-bootstrap/Card"
import TableView from "../TableView";

const tableProps = {
    fieldTypes: ["textCell"],
    headers: ["Name"],
    fieldNames: ["name"],
    fieldAttributes: [
        {}]
};

const rowValues = [
    {
        id: 1,
        mode: "inactive",
        name: "Hurricane Harvey",
    },
    {
        id: 2,
        mode: "inactive",
        name: "Great Alaska Earthquake",
    },
    {
        id: 3,
        mode: "inactive",
        name: "Hurricane Katrina"
    },
    {
        id: 4,
        mode: "inactive",
        name: "Northridge Earthquake"
    }
];

class Disasters extends React.Component {

    render() {
        return (
            <div className="Disasters">
                <div className="container">
                    <h1>Disasters</h1>
                    <h6>This page is for viewing, editing, adding, and deleting rows to the Disasters Table.</h6>
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
                <TableView {...tableProps} rowValues={rowValues} />
            </div>
        );
    }

}

export default Disasters;