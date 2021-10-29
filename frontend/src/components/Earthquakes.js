import React from "react";

import TableView from "../TableView";
import Card from "react-bootstrap/Card";

const tableProps = {
    fieldTypes: ["staticSelect", "textCell", "numberCell", "textCell", "staticSelect"],
    headers: ["Name", "Date", "Magnitude", "Epicenter", "Fault Type"],
    fieldNames: ["name", "date", "richterMagnitude", "epicenter", "faultType"],
    fieldAttributes: [
        {
            options: [
                {
                    value: -1,
                    label: ""
                },
                {
                    value: 1,
                    label: "Hurricane Harvey",
                },
                {
                    value: 2,
                    label: "Great Alaska Earthquake",
                },
                {
                    value: 3,
                    label: "Hurricane Katrina",
                },
                {
                    value: 4,
                    label: "Northridge Earthquake"
                }
            ]
        },
        {}, {}, {},
        {
            options: [
                {
                    value: 1,
                    label: "Normal"
                },
                {
                    value: 2,
                    label: "Thrust"
                },
                {
                    value: 3,
                    label: "Strike-Slip"
                },
                {
                    value: 4,
                    label: "Oblique"
                },
            ]
        }]
};

const rowValues = [
    {
        id: 1,
        mode: "inactive",
        name: 2,
        date: "3-27-1964",
        richterMagnitude: 9.2,
        epicenter: "60.908°N 147.339°W",
        faultType: 1
    },
    {
        id: 2,
        mode: "inactive",
        name: 4,
        date: "01-17-1994",
        richterMagnitude: 6.7,
        epicenter: "34.213°N 118.537°W",
        faultType: 2
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