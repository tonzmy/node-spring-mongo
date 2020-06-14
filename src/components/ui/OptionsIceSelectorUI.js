import "../../stylesheets/OptionsIceSelectorUI.css"

const OptionsIceSelectorUI = ({level, selected, onIceChangeFunction}) =>
  <div className ="inline-ice-selector">
    <input type="radio" id={level.replace(" ", "-")} name="ice" value={level.replace(" ", "-")} className={(level.toUpperCase() == selected.toUpperCase())? "checked":"unchecked"} checked={(level.toUpperCase() == selected.toUpperCase())} onChange={onIceChangeFunction}/>
    <div className="inline-ice-selector-label">
      <label htmlFor={level.replace(" ", "-")}>
        <span>{level.toUpperCase()}</span>
      </label>
    </div>
  </div>


export default OptionsIceSelectorUI
