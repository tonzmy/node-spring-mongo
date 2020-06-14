import PropTypes from "prop-types"
import Item from "./ItemUI"
import "../../stylesheets/ItemList.css"
import {Component} from 'react'

class TeaUI extends Component {
  constructor(props) {
    super(props)
    this.state = {products: [], isLoading: true}
  }

  componentDidMount() {
    this.setState({isLogin: true});
    const {category} = this.props
    fetch("/data/api/product/type/"+''+category)
      .then(response => response.json())
      .then(data => this.setState({products: data, isLoading: false}))
  }

  render() {
    const {favoriates, category, onUserAddToFavoriates, onUserRemoveFromFavoriates} = this.props
    const {products, isLoading} = this.state
    return (
      <div className="tea-page-wrapper">

        <div className="tea-page">
          {
            (isLoading == true) ?
            null :
            (products.map((product, i) =>
            <Item key={i} item={product} category={category} addToFavoriates={onUserAddToFavoriates} removeFromFavoriates={onUserRemoveFromFavoriates} selected={favoriates.includes(""+product.id)}/>))
          }
        </div>
      </div>
    )
  }
}

TeaUI.defaultProps = {
  favoriates: [],
  category: "",
  onUserAddToFavoriates: f=>f,
  onUserRemoveFromFavoriates: f=>f
}



export default TeaUI
