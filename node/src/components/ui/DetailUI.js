import PropTypes from "prop-types"
import {Component} from 'react'
import Button from 'react-bootstrap/Button'
import DetailImageCarouselUI from './DetailImageCarouselUI'
import SizeSelector from './SizeSelectorUI'
import QuantitySelector from './QuantitySelectorUI'
import OptionsSelector from './OptionsSelectorUI'
import "../../stylesheets/DetailUI.css"
import "../../stylesheets/SizeSelectorUI.css"
import "../../stylesheets/QuantitySelectorUI.css"

class DetailUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: "Medium",
      quantity: "1",
      options: {
        iceLevel: "regular ice",
        sugarLevel: "regular sugar"
      }
    }
    this.submit = this.submit.bind(this)
    this.onSizeChange = this.onSizeChange.bind(this)
    this.onQuantityChange = this.onQuantityChange.bind(this)
    this.onIceChange = this.onIceChange.bind(this)
    this.onSugarChange = this.onSugarChange.bind(this)
  }

  onSizeChange(e) {
    e.preventDefault()
    this.setState({size: e.target.value})
  }

  onQuantityChange(e) {
    e.preventDefault()

    this.setState({quantity: e.target.value})
  }

  onIceChange(e) {
    e.preventDefault()
    this.setState({options: {...this.state.options, iceLevel: e.target.value.replace("-", " ")}})
  }

  onSugarChange(e) {
    e.preventDefault()
    this.setState({options: {...this.state.options, sugarLevel: e.target.value.replace("-", " ")}})
  }

  submit(e) {
    e.preventDefault()
    console.log(this.state)
    const {id, name, onUserAddToBag} = this.props
    const {quantity, size, options} = this.state
    onUserAddToBag(id, name, parseInt(quantity), size, options)
  }

  render() {
    const {id, name, sizes, ice, sugar} = this.props
    return (
      <div className="detail-page-wrapper">
        <div className="detail-page">
          <div className="detail-image">
            <DetailImageCarouselUI />
          </div>
          <div className="detail-info">
            <h3>{name}</h3>

            <div className="detail-info-size">
                <legend>
                  <h4>Size</h4>
                </legend>
                <div className="size-selector">
                  {
                    sizes.map((s, i) => <SizeSelector key={i} size={s} selected={this.state.size} onChangeFunction={this.onSizeChange}/> )
                  }
                </div>
            </div>
            <p>{this.state.size}</p>
            <div className="detail-info-quantity">
              <legend>
                <h4>Quantity</h4>
              </legend>
              <div className="quantity-selector">
                <QuantitySelector selected={this.state.quantity} onChangeFunction={this.onQuantityChange}/>
              </div>
            </div>

            <div className="detail-info-options">
                <legend>
                  <h4>Options</h4>
                </legend>
                <div className="options-selector">
                  <OptionsSelector ice={ice} sugar={sugar} selectedIce={this.state.options.iceLevel} selectedSugar={this.state.options.sugarLevel} onIceChangeFunction={this.onIceChange} onSugarChangeFunction={this.onSugarChange}/>
                </div>
            </div>

            <form id="add-to-bag-form" onSubmit={this.submit}>
              <Button className="detail-info-add" variant="outline-primary" type="submit">Add to Bag</Button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

DetailUI.defaultProps = {
  sizes: ["Small", "Medium", "Large"],
  ice: ["regular ice", "less ice", "no ice"],
  sugar: ["regular sugar", "less sugar", "half sugar", "little sugar", "no sugar"],
  onUserAddToBag: f=>f
}





// const DetailUI = ({id, name, sizes=["Small", "Medium", "Large"], ice = ["regular ice", "less ice", "no ice"], sugar = ["regular sugar", "less sugar", "half sugar", "little sugar", "no sugar"], onUserAddToBag=f=>f}) => {
//   return (
//     <div className="detail-page-wrapper">
//       <div className="detail-page">
//         <div className="detail-image">
//           <DetailImageCarouselUI />
//         </div>
//         <div className="detail-info">
//           <h3>{name}</h3>
//
//           <div className="detail-info-size">
//               <fieldset form="add-to-bag-form">
//                 <legend>
//                   <h4>Size</h4>
//                 </legend>
//                 <div className="size-selector">
//                   {
//                     sizes.map((s, i) => <SizeSelector key={i} size={s}/> )
//                   }
//                 </div>
//               </fieldset>
//           </div>
//
//           <div className="detail-info-quantity">
//             <fieldset form="add-to-bag-form">
//               <legend>
//                 <h4>Quantity</h4>
//               </legend>
//               <div className="quantity-selector">
//                 <QuantitySelector />
//               </div>
//             </fieldset>
//           </div>
//
//           <div className="detail-info-options">
//             <fieldset>
//               <legend>
//                 <h4>Options</h4>
//               </legend>
//               <div className="options-selector">
//                 <OptionsSelector ice={ice} sugar={sugar} formId={"add-to-bag-form"}/>
//               </div>
//             </fieldset>
//           </div>
//           <form id="add-to-bag-form">
//             <Button className="detail-info-add" variant="outline-primary" type="submit">Add to Bag</Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }



export default DetailUI
