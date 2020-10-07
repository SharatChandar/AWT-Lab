import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logout = (_) => {
    localStorage.clear();
    props.history.push("/");
    window.location.reload();
  };
  return (
    <div>
      <Navbar className="Navbar" light expand="md">
        <NavbarBrand href="/">Projekt CD Red</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/sell/">Sell</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/stock/">View Stock</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/adding/">Add Stock</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/manage/">Manage</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {localStorage.getItem("username")}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={logout}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Example;
