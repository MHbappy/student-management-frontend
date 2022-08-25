import { useState } from "react";
import Switch from "react-switch";
import InvalidInputAlert from "./InvalidInputAlert";

const InputSwitch = ({
  inputRef = null,
  name = "",
  label = "",
  error = "",
}) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <div className="row mb-3">
      <label className="col-sm-2 col-form-label">{label}</label>
      <div className="col-sm-10">
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch bg-primary"
        />
        {checked ? (
          <input type="hidden" ref={inputRef} name={name} defaultValue={true} />
        ) : (
          <input
            type="hidden"
            ref={inputRef}
            name={name}
            defaultValue={false}
          />
        )}
        <InvalidInputAlert error={error} />
      </div>
    </div>
  );
};
export default InputSwitch;
