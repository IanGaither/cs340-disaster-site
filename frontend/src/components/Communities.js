import React from "react";

import Card from "react-bootstrap/Card";
import TableComponent from "../TableComponent";

/*const tableProps = {
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
                    value: 15,
                    label: "Louisiana"
                },
                {
                    value: 20,
                    label: "Oregon"
                },
                {
                    value: 23,
                    label: "Texas"
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
        name: "Anchorage",
        state: 2,
        population: 293531
    },
    {   id: 5,
        mode: "inactive",
        name: "Houston",
        state: 23,
        population: 2304580
    },
    {   id: 78,
        mode: "inactive",
        name: "New Orleans",
        state: 15,
        population: 383997
    }
];*/

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
                <TableComponent source={"communities"} />
            </div>
        );
    }

}

export default Communities;