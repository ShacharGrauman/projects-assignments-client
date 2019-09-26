import React from "react";
import logo from "../../../assets/loading.gif";
class loading extends React.Component {
  render() {
    return (
      <>
        <div className="row col-6 justify-content-center">
          <div className="col-12">
            <img
              src={logo}
              className="mx-auto"
              style={{
                position: "absolute",
                left: "50%"
              }}
            />
          </div>
        </div>
      </>
    );
  }
}
export default loading;
