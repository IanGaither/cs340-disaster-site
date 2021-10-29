import React from "react";

import TableView from "../TableView";

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
                <TableView {...tableProps} rowValues={rowValues} />
            </div>
        );
    }

}

export default Earthquakes;