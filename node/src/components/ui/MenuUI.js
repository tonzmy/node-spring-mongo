import {Component} from 'react'
import Cookies from 'universal-cookie'
import PropTypes from 'prop-types'
import { NavLink as Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import "../../stylesheets/Menu.css"
import bag from "../../../src/images/icons/bag.svg"

const cookies = new Cookies()

const MenuUI = ({status, selected, products, favoriatesNumber, bagNumber, onUserLogout=f=>f}) => {
  const submit = (e) => {
    e.preventDefault()
    onUserLogout()
  }
  return (
    <div className="menu">
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
          {
            products.map((product, i) =>
              <Nav.Link key={i} href={"/"+product[0].toLowerCase().replace(" ", "-")}>{product[0].toUpperCase()}</Nav.Link>
            )
          }
        </Nav>
      </Navbar.Collapse>
      <div className="menu-dropdown-numbers">
      <NavDropdown title="Me" id="collasible-nav-dropdown" alignRight>
      <NavDropdown.Item href="/bag">
        Bag
        {
          (bagNumber !== 0)?
            (<span className="fa-stack">
              <i className="fas fa-circle fa-stack-2x"></i>
              <strong id="number" className="fa-stack-1x">{bagNumber}</strong>
            </span>) :
            null
        }
      </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/favoriates">
          Favoriates
          {
            (favoriatesNumber !== 0)?
              (<span className="fa-stack">
                <i className="fas fa-circle fa-stack-2x"></i>
                <strong id="number" className="fa-stack-1x">{favoriatesNumber}</strong>
              </span>) :
              null
          }
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/accounts">Accounts</NavDropdown.Item>
        <NavDropdown.Divider />
        {
          (status != -1 && status != 0)?
          <NavDropdown.Item onClick={submit}>Logout</NavDropdown.Item> :
          <NavDropdown.Item href="/login">Login</NavDropdown.Item>
        }
      </NavDropdown>

        {(parseInt(bagNumber) + parseInt(favoriatesNumber) !== 0) ?
          (<span className="fa-stack">
            <i className="fas fa-circle fa-stack-2x"></i>
            <strong id="number" className="fa-stack-1x">{parseInt(bagNumber) + parseInt(favoriatesNumber)}</strong>
          </span>) :
          null
        }
      </div>
    </Navbar>
    <p className="path">{selected}</p>
    <p>{status}</p>
    </div>
  )
}


// const MenuUI = ({selected}) =>
//   <div className="menu">
//     <Nav variant="pills" justify activeKey={selected}>
//       <Nav.Item>
//         <Nav.Link href="/" >
//           Home
//         </Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link href="/bubble-tea">
//           Bubble Tea
//         </Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link href="/fruit-tea">
//           Fruit Tea
//         </Nav.Link>
//       </Nav.Item>
//       <NavDropdown title="shopping cart" id="nav-dropdown">
//         <NavDropdown.Item href="/bag">Bag</NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item href="/favoriates">Favoriates</NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item href="/accounts">Accounts</NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item href="/login">Login</NavDropdown.Item>
//       </NavDropdown>
//     </Nav>
//     <p>{selected}</p>
//   </div>

export default MenuUI
