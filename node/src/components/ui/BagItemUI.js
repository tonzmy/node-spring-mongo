import Button from 'react-bootstrap/Button'

const BagItem = ({item, onUpdate=f=>f, onRemove=f=>f}) =>
  <div className="bag-item-wrapper">
    <div className="bag-item-image-name">
        <p className="item-name">{item.name.toUpperCase()}</p>
    </div>
    <div className="bag-item-detail">
        <h3 className="bag-item-name">{item.name}</h3>
        <h4 className="bag-item-size">Size: {(item.size).toUpperCase()}</h4>

        <h4 className="bag-item-quantity">Quantity: {item.quantity}</h4>
        <h4 className="bag-item-options">Options</h4>
        <h5 className="bag-item-options-ice">Ice level: {(item.options.iceLevel).toUpperCase()}</h5>

        <h5 className="bag-item-options-sugar">Sugar level: {(item.options.sugarLevel).toUpperCase()}</h5>

        <Button className="bag-item-delete" variant="outline-primary" onClick={onRemove}>Delete</Button>
    </div>

  </div>


export default BagItem
