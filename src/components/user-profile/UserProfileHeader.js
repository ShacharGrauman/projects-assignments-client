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

const  deactivatedStyle = {
fontWeight:'bold',
border:'2px solid red',
color:'red',
width:'auto'
}

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      edit:undefined,
      id:this.props.id,
    }

  }

  

  componentDidMount(){
    this.setState({
      edit:this.props.edit,
    })
  }

  render() {
    return (
      <>
      {this.props.userState.deactivated && 
          <h2 className="p-2 text-center" style={deactivatedStyle}>Deactivated</h2>}
          
        {this.state.id && <div  style={{ marginBottom: "-25px" }}>
                            <h3>{this.props.name}'s Profile</h3>
                            <h6 className="mt-2">Employee Number: {this.props.employeeNumber}</h6>
                          </div>}
        <div className=" d-flex justify-content-between align-items-baseline">
          <img
            className="position-relative shadow"
            src={ImgProfile}
            style={styleProfileImg}
          ></img>
          
          {(!this.props.userState.locked && this.state.id)&& 
            <FontAwesomeIcon
              style={{fontSize:'2rem', opacity:'0.8', cursor:'pointer'}}
              icon={faEdit}
              onClick={()=>this.props.toggleEditMode()}
            ></FontAwesomeIcon>
          }
          
          
          
        </div>
      </>
    );
  }
}
