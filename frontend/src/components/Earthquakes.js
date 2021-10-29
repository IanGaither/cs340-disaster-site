import React from "react";

import TableView from "../TableView";
import Card from "react-bootstrap/Card";

const tableProps = {
    fieldTypes: ["textCell", "textCell", "numberCell", "textCell", "textCell"],
    headers: ["Name", "Date", "Magnitude", "Epicenter", "Fault Type"],
    fieldNames: ["name", "date", "richterMagnitude", "epicenter", "faultType"],
    fieldAttributes: [
        {}]
};

const rowValues = [
    {
        id: 1,
        mode: "inactive",
        name: "Great Alaska Earthquake",
        date: "3-27-1964",
        richterMagnitude: 9.2,
        epicenter: "60.908°N 147.339°W",
        faultType: "Normal"
    }
];

class Earthquakes extends React.Component {

    render() {
        return (
            <div className="Earthquakes">
                <div className="container">
                    <h1>Earthquakes</h1>
                    <h6>This page is for viewing, editing, adding, and deleting rows to the Earthquakes Table.</h6>
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

export default Earthquakes;