import React from "react";

const IsActive = ({ isActive = false }) => {
  return (
    <>
      {isActive ? (
        <i data-testid="is-active-icon" className="bi bi-check-circle-fill text-success"></i>
      ) : (
        <i data-testid="is-active-icon" className="bi bi-check-circle-fill text-danger"></i>
      )}
    </>
  );
};

export default IsActive;
