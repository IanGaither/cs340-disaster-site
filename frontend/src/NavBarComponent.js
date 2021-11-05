import React from "react";
import NavBar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand"
import NavLink from "react-bootstrap/NavLink"
import Nav from "react-bootstrap/Nav";
// import NavItem from "react-bootstrap/NavItem";
import Container from "react-bootstrap/Container"
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
                    <Container>
                        <LinkContainer to="/disasters">
                            <NavbarBrand>Disasters Database</NavbarBrand>
                        </LinkContainer>
                    <Nav>
                        <LinkContainer to="/disasters">
                            <NavLink>DisasterEvents</NavLink>
                        </LinkContainer>
                        <LinkContainer to="/communities">
                            <NavLink>Communities</NavLink>
                        </LinkContainer>
                        <LinkContainer to="/impacts">
                            <NavLink>Impacts</NavLink>
                        </LinkContainer>
                        <LinkContainer to="/earthquakes">
                            <NavLink>Earthquakes</NavLink>
                        </LinkContainer>
                        <LinkContainer to="/hurricanes">
                            <NavLink>Hurricanes</NavLink>
                        </LinkContainer>
                    </Nav>
                    </Container>
                </NavBar>
            </div>)

    }

}

export default NavBarComponent;