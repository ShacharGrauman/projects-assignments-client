import React from "react";

const SkillColor = props => {
     return ( 
           <div className={`alert alert-${props.type == 't' ? 'success' : 'warning'} alert-dismissible fade show`} role="alert">
                <strong>{props.name}: {props.level}</strong>
                <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={e => props.removeSkill(props.id)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
      );
};

export default SkillColor;