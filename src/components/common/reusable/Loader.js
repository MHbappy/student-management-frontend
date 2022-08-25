import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = () => {
  return (
    <div
      className="justify-content-center align-items-center d-flex"
      style={{ height: "200px" }}
    >
      <PropagateLoader color="#0B5ED7" size={15} />
    </div>
  );
};

export default Loader;
