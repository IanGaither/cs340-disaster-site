import React from "react";

import TableView from "../TableView";
import Card from "react-bootstrap/Card";

const tableProps = {
    fieldTypes: ["textCell", "textCell", "numberCell", "numberCell", "numberCell", "numberCell"],
    headers: ["Community", "Disaster", "Fatalities", "Injuries", "Property Damage", "Relief Cost"],
    fieldNames: ["community", "disaster", "fatalities", "injuries", "propertyDamage", "reliefCost"],
    fieldAttributes: [
        {}]
};

const rowValues = [
    {
        id: 1,
        mode: "inactive",
        community: "Austin, Texas",
        disaster: "Hurricane Harvey",
        fatalities: 68,
        injuries: 300,
        propertyDamage: 125000000000,
        reliefCost: 30000000
    }
];

class Impacts extends React.Component {

    render() {
        return (
            <div className="Impacts">
                <div className="container">
                    <h1>Impacts</h1>
                    <h6>This page is for viewing, editing, adding, and deleting rows to the Impacts Table.</h6>
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