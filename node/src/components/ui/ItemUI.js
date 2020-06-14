import PropTypes from "prop-types"
import {Component} from 'react'
import { withRouter } from 'react-router'


class ItemUI extends Component {
  constructor(props) {
    super(props)
    this.click = this.click.bind(this)
  }

  click(e) {
    e.preventDefault()
    const {id, name} = this.props.item
    const {addToFavoriates, removeFromFavoriates, selected} = this.props
    if (selected === true) {
      removeFromFavoriates(id)
    } else {
      addToFavoriates(id, name)
    }
    console.log(selected)
  }

  render() {
    const {id, name} = this.props.item
    const {category, history} = this.props
    return (
      <div className="item-wrapper">
        <div>
          <i class="fas fa-ellipsis-h" onClick={() => history.push(`/${category}/detail/${id}`)}></i>
          <i className="fas fa-heart" id={(this.props.selected===true)? "selected" : "unselected"} onClick={this.click}></i>
          <div>
            <p className="item-name">{name.toUpperCase()}</p>
          </div>
        </div>
      </div>
    )
  }
}

// class ItemUI extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       selected: false
//     }
//     this.click = this.click.bind(this)
//   }
//
//   click(e) {
//     e.preventDefault()
//     const {id, name} = this.props.item
//     const {addToFavoriates, removeFromFavoriates} = this.props
//     if (this.state.selected === true) {
//       this.setState({selected: false})
//       removeFromFavoriates(id)
//     } else {
//       this.setState({selected: true})
//       addToFavoriates(id, name)
//     }
//   }
//
//   render() {
//     const {id, name} = this.props.item
//     return (
//       <div className="item-wrapper">
//         <div>
//           <i class="fas fa-ellipsis-h"></i>
//           <i className="fas fa-heart" id={(this.state.selected===true)? "selected" : "unselected"} onClick={this.click}></i>
//           <div>
//             <p className="item-name">{name.toUpperCase()}</p>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

ItemUI.defaultProps = {
  item: {},
  addToFavoriates: f=>f
}





export default withRouter(ItemUI)
