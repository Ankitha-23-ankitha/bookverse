import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Book, LogOut} from 'lucide-react'
import { UserContext } from '../ContextApi/UserContext'
import { Navbar, Nav, Container } from "react-bootstrap";


const Header = () => {

  const navigate = useNavigate()

    const {username, name, setInput, setSelectValue, isAdmin} = useContext(UserContext)
    
    const logout = ()=>{
        localStorage.removeItem('name')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
        localStorage.removeItem('isAdmin')
        navigate('/bookverse')
        window.location.reload()
      }

  return (
    <Navbar expand="lg" className="fw-semibold px-4 header m-0 fixed-top">
      <Container fluid>

        <Navbar.Brand className="d-flex align-items-center" onClick={() => navigate("/bookverse")}>
          <Book strokeWidth={3} className="logo" />
          <span className="fs-3 ps-2 logo">BookVerse</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3 fs-5">
            <Nav.Link
              className="link"
              onClick={() => {
                navigate("/bookverse");
                setInput("");
                setSelectValue({ value: "All", label: "All" });
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link className="link" onClick={() => navigate("/bookverse/explore")}>
              Explore
            </Nav.Link>
            <Nav.Link className="link" onClick={() => navigate("/bookverse/orders")}>
              Orders
            </Nav.Link>
            <Nav.Link className="link" onClick={() => navigate("/bookverse/explore/cart")}>
              Cart
            </Nav.Link>
            {name === "" ? (
              <Nav.Link className="link" onClick={() => navigate("/bookverse/login")}>
                Login
              </Nav.Link>
            ) : (
              <Nav.Link className="link" onClick={() => navigate(`/bookverse/profile/${username}`)}>
                {name}
              </Nav.Link>
            )}
            {isAdmin === "true" && (
              <Nav.Link className="link" onClick={() => navigate("/bookverse/users")}>
                Users
              </Nav.Link>
            )}
            {name !== "" && (
              <Nav.Link className="link" onClick={logout}>
                <LogOut />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
