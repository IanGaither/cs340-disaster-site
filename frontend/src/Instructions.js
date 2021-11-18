import Card from "react-bootstrap/Card";
import Badge from 'react-bootstrap/Badge';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import axios from 'axios';

import React from "react";

function Instructions() {
    function handleReset() {
        axios.get('/api/reset')
            .then(() => {
                window.location.reload();
                return false;
            })
    }

    return (
        <Card className="mb-4">
            <Card.Body className="Body">
                    <Card.Text className="Text mb-0">To edit or delete a row, hover over it or tap on it and "Edit" and "Delete" buttons will appear.</Card.Text>
                    <Card.Text className="Text mb-0">If you click the "Edit" button, the row will become editable and "Save" and "Cancel will appear.</Card.Text>
                    <Card.Text className="Text mb-0">To add a row, click the "+" button below the table and a form will appear for adding new rows.</Card.Text>
                    <Card.Text className="Text mb-0">Once a row is open for editing, you must save it or cancel before editing or adding any other rows.</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem className="mb-0">To get the data back to its original state, click<span className="ms-1"> </span><Badge onClick={handleReset} bg='danger' size='sm' >Reset Database</Badge></ListGroupItem>
            </ListGroup>
        </Card>
    )
}

export default Instructions;