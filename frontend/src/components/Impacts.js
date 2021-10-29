import React from "react";

import TableView from "../TableView";
import Card from "react-bootstrap/Card";

const tableProps = {
    fieldTypes: ["staticSelect", "staticSelect", "numberCell", "numberCell", "numberCell", "numberCell"],
    headers: ["Community", "Disaster", "Fatalities", "Injuries", "Property Damage", "Relief Cost"],
    fieldNames: ["community", "disaster", "fatalities", "injuries", "propertyDamage", "reliefCost"],
    fieldAttributes: [
        {
            options: [
                {
                    value: 1,
                    label: "Anchorage"
                },
                {
                    value: 5,
                    label: "Houston"
                },
                {
                    value: 78,
                    label: "New Orleans"
                },
            ]
        },
        {
            options: [
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
        {}, {}, {}, {}]
};

const rowValues = [
    {
        id: 1,
        mode: "inactive",
        community: 5,
        disaster: 1,
        fatalities: 68,
        injuries: 300,
        propertyDamage: 125000000000,
        reliefCost: 30000000
    },
    {
        id: 2,
        mode: "inactive",
        community: 1,
        disaster: 2,
        fatalities: 131,
        injuries: 600,
        propertyDamage: 311000000,
        reliefCost: 98000000
    }
];

class Impacts extends React.Component {

    render() {
        return (
            <div className="Impacts">
                <div className="container">
                    <h1>Impacts</h1>
                    <h6>This page is for viewing, editing, adding, and deleting rows to the Impacts Table.</h6>
                    <p>Before creating a row for a specific disaster impact, you need to make sure there are rows for
                        both the impacted community in Communities and the disaster in Disasters.</p>
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

export default Impacts;