import InvalidInputAlert from "./InvalidInputAlert";
const InputSelectField = ({
  title = "",
  removeLabel = false,
  label = "",
  name = "",
  items = [],

  error = null,
  inputClassNames = "",
  defaultInputValue = null,
  isRequired = false,
  optionClassNames = "",
  inputRef = null,
  handleOnChange = null,
  handleOnBlur = null,

  readOnly = false,
  required = false,
  resetTemplateSelectionItems = null,
}) => (
  <div className="row mb-3">
    <label htmlFor="inputText" className="col-sm-2 col-form-label">
      {label}
      <font color="red" className="ms-1">
        {isRequired && "*"}
      </font>
    </label>
    <div className="col-sm-10">
      <select
        id={name}
        required={required}
        disabled={readOnly}
        name={name}
        ref={inputRef}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        className={`form-control form-select shadow-sm ${inputClassNames}`}
      >
        {!removeLabel && (
          <option
            value=""
            className="text-muted"
            onClick={() => resetTemplateSelectionItems([])}
          >
            {title || "--Please choose an option--"}
          </option>
        )}

        {items?.map((item) => (
          <option
            key={item?.id}
            className={optionClassNames}
            name={item?.value}
            value={item?.id}
            defaultValue={
              parseInt(defaultInputValue, 10) === parseInt(item?.id, 10)
            }
            selected={defaultInputValue === item?.id}
          >
            {item?.name}
          </option>
        ))}
      </select>
      <InvalidInputAlert error={error} />
    </div>
  </div>
);

export default InputSelectField;
