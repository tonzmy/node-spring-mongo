import PropTypes from 'prop-types'
import { NavLink as Link } from 'react-router-dom'

const HomePageProductUI = ({name}) =>
  <Link to={"/"+name.toLowerCase().replace(" ", "-")}>
  <div>
    <h3>{name}</h3>
  </div>
  </Link>


HomePageProductUI.PropTypes = {
  name: PropTypes.string
}

export default HomePageProductUI
