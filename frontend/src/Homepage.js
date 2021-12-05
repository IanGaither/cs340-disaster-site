import React from "react";
import Card from 'react-bootstrap/Card'
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";

function Homepage() {
    return (
        <div className="container">
        <h1 className="display-1">Disasters Database</h1>
        <p>The US Federal Government is looking to improve disaster readiness and response times for the National
            Guard and other local disaster relief efforts. A team of a dozen researchers has been tasked with finding
            trends across all 50 US states by analyzing the impact of thousands of natural disasters over the past 100
            years.</p>
        <p>The database they will use is focused on comparing different concerns like disaster frequency and severity
            in order to find high risk zones which could be better supported by government aid.</p>
        <p>The researchers are currently only gathering data on earthquakes and hurricanes, so there are only entities
            for those two disaster types in the database. However, they have designed the schema to be extensible to
            other types of disasters by simply adding an additional entity representing the new type.</p>
            <Card>
            <ListGroup className="list-group-flush">
                <ListGroupItem className="mb-0">To view and edit the database tables, click on one of the table links on the right side of the navigation bar.</ListGroupItem>
            </ListGroup>
            </Card>
        </div>
    )
}

export default Homepage;