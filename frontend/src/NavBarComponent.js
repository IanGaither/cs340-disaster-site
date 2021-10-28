import React from "react";
import NavBar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import { LinkContainer } from "react-router-bootstrap";

class NavBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //rowValues: rowValues
        }
    }

    render() {
        return (
            <div className="nav-bar">
                <NavBar bg="light">
                    <Nav>
                        <LinkContainer to="/disasters">
                            <NavItem>Disasters</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/communities">
                            <NavItem>Communities</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/impacts">
                            <NavItem>Impacts</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/earthquakes">
                            <NavItem>Earthquakes</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/hurricanes">
                            <NavItem>Hurricanes</NavItem>
                        </LinkContainer>
                    </Nav>
                </NavBar>
            </div>)

    }

}

export default NavBarComponent;