import React from "react";

import TableView from "../TableView";
import Card from "react-bootstrap/Card";

const tableProps = {
    fieldTypes: ["staticSelect", "textCell", "textCell", "numberCell", "numberCell"],
    headers: ["Name", "Start Date", "End Date", "Category", "Max Wind Speed"],
    fieldNames: ["name", "startDate", "endDate", "saffirSimpsonCategory", "maxWindSpeed"],
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
        }]
};

const rowValues = [
    {
        id: 1,
        mode: "inactive",
        name: 1,
        startDate: "08-17-2017",
        endDate: "09-2-2017",
        saffirSimpsonCategory: 4,
        maxWindSpeed: 134
    },
    {
        id: 2,
        mode: "inactive",
        name: 3,
        startDate: "08-23-2005",
        endDate: "08-31-2005",
        saffirSimpsonCategory: 5,
        maxWindSpeed: 175
    }
];

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
                <TableView {...tableProps} rowValues={rowValues} />
            </div>
        );
    }

}

export default Hurricanes;