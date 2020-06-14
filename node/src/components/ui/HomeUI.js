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
    this.state = {
      products: [],
      isLoading: true
    }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this.setState({isLoading: true})
    fetch("/data/api/product/types")
      .then(response=> response.json())
      .then(data => this.setState({products: data, isLoading: false}))
  }

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
    const {products, isLoading} = this.state
    return (
      (isLoading == false) ?
      (<div className="home-wrapper">
        <div className="home-page">
          <div className="home-header">
            <h1>Welcome!</h1>
          </div>
          <div className="home-page-product">
            {
              products.map((product, i) => (
                <HomePageProductUI key={i} name={product} />
              ))
            }
          </div>
          </div>
        </div>):
        null
    )
  }
}


export default HomeUI
//
// {
//   (cookies.get('_uuid'))?
//   <button onClick={this.submit}>Logout</button> :
//   null
//   }
