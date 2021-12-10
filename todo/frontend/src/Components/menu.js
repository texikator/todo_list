import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm'
//import Link from 'react-bootstrap/Link';

//import 'react-bootstrap/dist/react-bootstrap.min.js';

const Menu = () => {
    return (
          <Nav className="site-header sticky-top py-3">
              <Container className="container d-flex flex-column flex-md-row justify-content-between">

                <Link className="py-6 d-none d-md-inline-block" to="/">Users</Link>
                <Link className="py-6 d-none d-md-inline-block" to="/projects">Projects</Link>
                <Link className="py-6 d-none d-md-inline-block" to="/todos">ToDo List</Link>
                <Link className="py-6 d-none d-md-inline-block" to="/login">Login</Link>
                </Container>
        </Nav>

    )
}

export default Menu;