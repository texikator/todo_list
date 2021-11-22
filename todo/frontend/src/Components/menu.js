import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';


import 'react-bootstrap/dist/react-bootstrap.min.js';

const Menu = () => {
    return (
          <Nav className="site-header sticky-top py-1">
              <Container class="container d-flex flex-column flex-md-row justify-content-between">

                <Nav.Link className="py-2 d-none d-md-inline-block" href="#">One</Nav.Link>
                <Nav.Link className="py-2 d-none d-md-inline-block" href="#">Two</Nav.Link>
                <Nav.Link className="py-2 d-none d-md-inline-block" href="#">THree</Nav.Link>

              </Container>
        </Nav>

    )
}

export default Menu;