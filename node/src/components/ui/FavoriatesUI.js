import Item from './ItemUI'
import "../../stylesheets/FavoriatesUI.css"


const FavoriatesUI = ({favoriates=[], onUserRemoveFromFavoriates=f=>f}) => {

  return (
    <div className="favoriates-page-wrapper">
      <div className="favoriates-page">
        {favoriates.map((favoriate, i) =>
          <Item key={i} item={{id: favoriate["id"], name: favoriate["name"]}} category={favoriate["category"]} selected={true} removeFromFavoriates={onUserRemoveFromFavoriates} />
        )
        }
      </div>
    </div>
  )
  }

export default FavoriatesUI
