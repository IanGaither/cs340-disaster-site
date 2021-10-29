import React from "react";

import TableView from "../TableView";

const tableProps = {
    fieldTypes: ["textCell", "textCell"],
    headers: ["Name"],
    fieldNames: ["name"],
    fieldAttributes: [
        {},
        {}]
};

const rowValues = [
    {
        id: 1,
        mode: "inactive",
        name: "Hurricane Harvey",
    },
    {
        id: 1,
        mode: "inactive",
        name: "Great Alaska Earthquake",
    }
];

class Disasters extends React.Component {

    render() {
        return (
            <div className="Disasters">
                <TableView {...tableProps} rowValues={rowValues} />
            </div>
        );
    }

}

export default Disasters;