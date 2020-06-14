import BagItem from './BagItemUI'

import {Component} from 'react'
import "../../stylesheets/BagUI.css"

class BagUI extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit(e) {
    e.preventDefault()
  }

  render() {
    const {bag, onUserRemoveFromBag, onUserUpdateBag} = this.props
    return (
      <div className="bag-page-wrapper">
        {
          (bag.length != 0) ?
            (
              <div>
                <h1>My Bag</h1>
                <div className="bag-page">
                  {
                    bag.map((item) =>
                      <BagItem item={item} key={item.uuid} onUpdate={onUserUpdateBag} onRemove={()=>onUserRemoveFromBag(item.uuid)}/>
                    )
                  }
                </div>
              </div>
            ) :
            (<h1>Your bag is empty.</h1>)
        }

      </div>
    )
  }

}




export default BagUI
