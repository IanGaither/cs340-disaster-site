import React from "react";

import TableView from "../TableView";
import Card from "react-bootstrap/Card";

const tableProps = {
    fieldTypes: ["textCell", "staticSelect", "numberCell"],
    headers: ["Name", "State", "Population"],
    fieldNames: ["name", "state", "population"],
    fieldAttributes: [
        {},
        {
            options: [
                {
                    value: 1,
                    label: "Alabama"
                },
                {
                    value: 2,
                    label: "Alaska"
                },
                {
                    value: 44,
                    label: "Oregon"
                },
                {
                    value: 45,
                    label: "Washington"
                }
            ]
        },
        {}]
};

const rowValues = [
    {
        id: 1,
        mode: "inactive",
        name: "Seattle",
        state: 45,
        population: 750000
    },
    {   id: 5,
        mode: "active",
        name: "Portland",
        state: 44,
        population: 650000
    },
    {   id: 78,
        mode: "edit",
        name: "Spokane",
        state: 45,
        population: 250000
    }
];

class Communities extends React.Component {

    render() {
        return (
            <div className="Communities">
                <div className="container">
                    <h1>Communities</h1>
                    <h6>This page is for viewing, editing, adding, and deleting rows to the Communities Table.</h6>
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

export default Communities;