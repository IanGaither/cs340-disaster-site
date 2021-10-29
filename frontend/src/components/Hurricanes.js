import React from "react";

import TableView from "../TableView";

const tableProps = {
    fieldTypes: ["textCell", "textCell", "textCell", "numberCell", "numberCell"],
    headers: ["Name", "Start Date", "End Date", "Category", "Max Wind Speed"],
    fieldNames: ["name", "startDate", "endDate", "saffirSimpsonCategory", "maxWindSpeed"],
    fieldAttributes: [
        {}]
};

const rowValues = [
    {
        id: 1,
        mode: "inactive",
        name: "Harvey",
        startDate: "8-17-2017",
        endDate: "9-2-2017",
        saffirSimpsonCategory: 4,
        maxWindSpeed: 134
    }
];

class Hurricanes extends React.Component {

    render() {
        return (
            <div className="Hurricanes">
                <TableView {...tableProps} rowValues={rowValues} />
            </div>
        );
    }

}

export default Hurricanes;