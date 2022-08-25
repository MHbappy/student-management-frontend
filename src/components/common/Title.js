import React from "react";

const Title = ({ title = "" }) => {
  return <h5 className="card-title text-capitalize">{title}</h5>;
};

export default Title;
