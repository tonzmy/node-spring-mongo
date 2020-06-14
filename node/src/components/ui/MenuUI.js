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

class MenuUI extends Component {
  constructor(props) {
    super(props)
    this.state = {products: [], isLoading: true}
    this.submit = this.submit.bind(this)
  }
  submit(e) {
    const {onUserLogout} = this.props
    e.preventDefault()
    onUserLogout()
  }
  componentDidMount() {
    this.setState({isLoading: true})
    fetch("/data/api/product/types")
      .then(response=> response.json())
      .then(data => this.setState({products: data, isLoading: false}))
  }


  render() {
      const {status, selected, favoriatesNumber, bagNumber, onUserLogout} = this.props
      const {products, isLoading} = this.state
    return (
      <div className="menu">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
            {
              (isLoading == true)?
              null :
              (products.map((product, i) =>
                <Nav.Link key={i} href={"/"+product.toLowerCase().replace(" ", "-")}>{product.toUpperCase()}</Nav.Link>
              ))
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
            <NavDropdown.Item onClick={this.submit}>Logout</NavDropdown.Item> :
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
      </div>
    )
  }
}

MenuUI.defaultProps = {
  onUserLogout: f=>f
}

export default MenuUI
