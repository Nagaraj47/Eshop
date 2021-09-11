import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { emptyCart } from "../redux/actions/cartActions";
import { removeUser } from "../redux/actions/userActions";

function NavBar() {
  const cartItems = useSelector((state) => state.allProducts.cart);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(emptyCart());
    dispatch(removeUser());
  };

  return (
    <div className="nav-bar">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">EMeds</Navbar.Brand>

          <Nav className="me-auto">
            <Link to="/">
              <Nav.Link href="#home "> Home</Nav.Link>
            </Link>
            <Link to="/productlist">
              <Nav.Link href="#productlist">Store</Nav.Link>
            </Link>
            <Link to="/cart">
              <Nav.Link href="#cart">Cart [{cartItems.length}]</Nav.Link>
            </Link>
            {user.isLogged ? (
              <NavDropdown title={user.name} id="navbarScrollingDropdown">
                {user.isAdmin && (
                  <div>
                    <Link to="/manageproducts">
                      <NavDropdown.Item href="#manageproducts">
                        Manage Products
                      </NavDropdown.Item>
                    </Link>
                    <Link to="/managecustomers">
                      <NavDropdown.Item href="#managecustomers">
                        Manage Customers
                      </NavDropdown.Item>
                    </Link>
                    <Link to="/manageorders">
                      <NavDropdown.Item href="#manageorders">
                        Manage Orders
                      </NavDropdown.Item>
                    </Link>
                  </div>
                )}
                <Link to="/">
                  <NavDropdown.Item
                    href="#signout"
                    onClick={() => signoutHandler()}
                  >
                    SignOut
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            ) : (
              <Link to="/signin">
                <Nav.Link href="#signin">Sign-In </Nav.Link>
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
