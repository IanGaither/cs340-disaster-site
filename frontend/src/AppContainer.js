import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBarComponent from "./NavBarComponent";
//import TableView from "./TableView"
import Disasters from "./Tables/Disasters";
import Communities from "./Tables/Communities";
import Earthquakes from "./Tables/Earthquakes";
import Impacts from "./Tables/Impacts";
import Hurricanes from "./Tables/Hurricanes";
import Homepage from "./Homepage";

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
};*/

class AppContainer extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <NavBarComponent/>
                <Switch>
                    <Route path="/disaster_events">
                        <Disasters/>
                    </Route>
                    <Route path="/communities">
                        <Communities/>
                    </Route>
                    <Route path="/impacts">
                        <Impacts/>
                    </Route>
                    <Route path="/earthquakes">
                        <Earthquakes/>
                    </Route>
                    <Route path="/hurricanes">
                        <Hurricanes/>
                    </Route>
                    <Route exact path="/">
                        <Homepage/>
                    </Route>
                </Switch>
                </div>
            </BrowserRouter>
        );
    }

}

export default AppContainer;