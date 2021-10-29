import React from "react";

import TableView from "../TableView";

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
                <TableView {...tableProps} rowValues={rowValues} />
            </div>
        );
    }

}

export default Impacts;