import React from "react";

import TableView from "../TableView";

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
                <TableView {...tableProps} rowValues={rowValues} />
            </div>
        );
    }

}

export default Communities;