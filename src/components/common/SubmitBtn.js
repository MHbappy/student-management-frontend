const SubmitBtn = ({ label = "Submit Form", loading = false }) => {
  return (
    <div className="row mb-3">
      <label className="col-sm-2 col-form-label"></label>
      <div className="col-sm-10">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Please wait..." : label}
        </button>
      </div>
    </div>
  );
};

export default SubmitBtn;
