import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBarComponent from "./NavBarComponent";
//import TableView from "./TableView"
import Disasters from "./components/Disasters";
import Communities from "./components/Communities";
import Earthquakes from "./components/Earthquakes";
import Impacts from "./components/Impacts";
import Hurricanes from "./components/Hurricanes";

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
                    <Route path="/disasters">
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
                </Switch>
                </div>
            </BrowserRouter>
        );
    }

}

export default AppContainer;