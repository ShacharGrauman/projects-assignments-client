import React from "react";
/**
 * an input error in a div
 */
const InputError = ({ e }) => {
  return e.map((eerr, index) => (
    <div
      className="alert alert-danger"
      role="alert"
      style={{ marginTop: "5px" }}
      key={index}
    >
      {eerr}
    </div>
  ));
};

export default InputError;
