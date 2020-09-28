import '../assets/TopNavComponent.scss';
import React from 'react';
import { Navbar } from 'react-bootstrap';

const TopNavComponent: React.FC = (): JSX.Element => {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand className="TopNav">Health Insurance Deduction Calculator</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  );
};

export default TopNavComponent;
