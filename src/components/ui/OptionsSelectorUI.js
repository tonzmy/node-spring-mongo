import OptionsIceSelectorUI from './OptionsIceSelectorUI'
import OptionsSugarSelectorUI from './OptionsSugarSelectorUI'
import "../../stylesheets/OptionsSelector.css"


const OptionsSelector = ({ice = ["regular-ice", "less-ice", "no-ice"], sugar = ["regular-sugar", "less-sugar", "half-sugar", "little-sugar", "no-sugar"], selectedIce, selectedSugar, onIceChangeFunction, onSugarChangeFunction}) =>
  <div className="inline-options-selector">
    <div className="ice-fieldset">
      <fieldset>
        <legend>
          <h5>Ice level</h5>
        </legend>
        <div className="ice-options-selector">
          {
            ice.map((level, i) =>
              <OptionsIceSelectorUI key={i} level={level} selected={selectedIce} onIceChangeFunction={onIceChangeFunction}/>
          )
          }
        </div>
      </fieldset>
    </div>
    <div className="sugar-fieldset">
      <fieldset>
        <legend>
          <h5>Sugar level</h5>
        </legend>
        <div className="sugar-options-selector">
          {
            sugar.map((level, i) =>
              <OptionsSugarSelectorUI key={i} level={level} selected={selectedSugar} onSugarChangeFunction={onSugarChangeFunction}/>
          )
          }
        </div>
      </fieldset>
    </div>
  </div>


export default OptionsSelector
