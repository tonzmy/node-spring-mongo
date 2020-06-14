import "../../stylesheets/OptionsSugarSelectorUI.css"

const OptionsSugarSelectorUI = ({level, selected, onSugarChangeFunction}) =>
  <div className ="inline-sugar-selector">
    <input type="radio" id={level.replace(" ", "-")} name="sugar" value={level.replace(" ", "-")} className={(level.toUpperCase() == selected.toUpperCase())? "checked":"unchecked"} checked={(level.toUpperCase() == selected.toUpperCase())} onChange={onSugarChangeFunction}/>
    <div className="inline-sugar-selector-label">
      <label htmlFor={level.replace(" ", "-")}>
        <span>{level.toUpperCase()}</span>
      </label>
    </div>
  </div>


export default OptionsSugarSelectorUI
