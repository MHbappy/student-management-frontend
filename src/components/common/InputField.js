import InvalidInputAlert from "./InvalidInputAlert";

const InputField = ({
  label = "",
  defaultInputValue = null,
  isRequired = false,
  type = "text",
  name = "",
  accept = null,
  inputRef = null,
  error = "",
  placeholder = "",
  handleOnChange = null,
  handleOnBlur = null,
}) => {
  return (
    <div className="row mb-3">
      <label htmlFor="inputText" className="col-sm-2 col-form-label">
        {label}
        <font color="red" className="ms-1">
          {isRequired && "*"}
        </font>
      </label>
      <div className="col-sm-10">
        <input
          className="form-control"
          type={type}
          accept={accept}
          defaultValue={defaultInputValue}
          name={name}
          placeholder={placeholder}
          ref={inputRef}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        <InvalidInputAlert error={error} />
      </div>
    </div>
  );
};

export default InputField;
