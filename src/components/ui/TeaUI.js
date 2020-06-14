import PropTypes from "prop-types"
import Item from "./ItemUI"
import "../../stylesheets/ItemList.css"

const TeaUI = ({products=[], favoriates=[], category="", onUserAddToFavoriates=f=>f, onUserRemoveFromFavoriates=f=>f}) =>
    <div className="tea-page-wrapper">
    <p>{favoriates}</p>
      <div className="tea-page">
        {products.map((product, i) =>
          <Item key={i} item={product} category={category} addToFavoriates={onUserAddToFavoriates} removeFromFavoriates={onUserRemoveFromFavoriates} selected={favoriates.includes(""+product.id)}/>
        )}
      </div>
    </div>



export default TeaUI
