import React from "react";
import ImgProfile from "../../assets/profileImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const styleProfileImg = {
  backgroundColor: "white",
  borderRadius: "50%",
  width: "90px",
  right: "45px",
  top: "45px",
  zIndex: "3",
  cursor: "pointer"
};

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      id:this.props.id
    }

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.browseImage = this.browseImage.bind(this);
  }
  toggleEditMode() {
    this.props.toggleEditMode();
  }

  browseImage() {
    this.props.browseImage();
  }

  render() {
    return (
      <>
        <h5 style={{ marginBottom: "-25px" }}>
          {this.state.id}'s User Profile
        </h5>
        <div className=" d-flex justify-content-between align-items-baseline">
          <img
            onClick={this.browseImage}
            className="position-relative shadow"
            src={ImgProfile}
            style={styleProfileImg}
          ></img>

          {!this.props.isLocked.locked && (
            <FontAwesomeIcon
              style={{fontSize:'1.5rem', opacity:'0.8', cursor:'pointer'}}
              icon={faEdit}
              onClick={this.toggleEditMode}
            ></FontAwesomeIcon>
          )}
        </div>
      </>
    );
  }
}
