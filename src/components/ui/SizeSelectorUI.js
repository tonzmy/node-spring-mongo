const SizeSelector = ({size, selected, onChangeFunction=f=>f}) =>
  <div className ="inline-size-selector">
    <input type="radio" id={size} name="size" value={size} className={(selected.toUpperCase()==size.toUpperCase())? "checked":"unchecked"} checked={selected.toUpperCase()==size.toUpperCase()} onChange={onChangeFunction}/>
    <div className="inline-size-selector-label">
      <label htmlFor={size}>
        <span>{size.toUpperCase()}</span>
      </label>
    </div>
  </div>


export default SizeSelector
