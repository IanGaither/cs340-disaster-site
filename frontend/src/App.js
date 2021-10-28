// import logo from './logo.svg';
// import './App.css';
import TableView from "./TableView"
import React from "react";

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

function App() {
  return (
    <div className="App">
        <TableView {...tableProps}/>
    </div>
  );
}

export default App;
