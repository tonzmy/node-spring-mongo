import PropTypes from 'prop-types'
import {Component} from 'react'
import Cookies from 'universal-cookie'
import HomePageProductUI from './HomePageProductUI'
import "../../stylesheets/HomeUI.css"
const cookies = new Cookies()

class HomeUI extends Component {
  constructor(props) {
    super(props)
    // const {status}  = this.props
    // console.log("constriuctor", status)
    this.submit = this.submit.bind(this)
  }

  // componentDidMount() {
  //   const {status} = this.props
  //   console.log("did mount", status)
  //   console.log("cookie", cookies.get('_uuid'))
  // }

  // componentDidUpdate(nextProps) {
  //   const {status} = nextProps
  //   console.log("did upate:", status)
  // }
  submit(e) {
    const {status, onUserLogout} = this.props
    console.log(status)
    e.preventDefault()
    onUserLogout()
  }
  render() {
    const {products} = this.props
    return (
      <div className="home-wrapper">
        <div className="home-page">
          <div className="home-header">
            <h1>Welcome!</h1>
          </div>
          <div className="home-page-product">
            {
              products.map((product, i) => (
                <HomePageProductUI key={i} name={product[0]} />
              ))
            }
          </div>
          </div>
        </div>
    )
  }
}



// HomeUI.defaultProps = {
//   products = [ [ 'tea' ], [ 'bubble tea' ], [ 'fruit tea' ] ]
// }

export default HomeUI
//
// {
//   (cookies.get('_uuid'))?
//   <button onClick={this.submit}>Logout</button> :
//   null
//   }
