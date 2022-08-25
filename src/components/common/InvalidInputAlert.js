const InvalidInputAlert = ({ error }) => (
  <>
    {error && (
      <div className="text-danger p-1 text-left" role="alert">
        <i className="fa fa-info-circle" />{" "}
        {error.message ? error.message : error}
      </div>
    )}
  </>
);

export default InvalidInputAlert;
