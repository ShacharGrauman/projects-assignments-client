import React from "react";

export default props => {
   if (props.type === "Tech") {
    return (
      <span className="badge badge-success mr-1">
        {props.name}{" "}
        <span className="badge badge-light" style={{ fontSize: props.level > 3 ? "1em" : "" }}>
          {props.level}
        </span>
      </span>
    );
   }

   else {
    return (
        <span className="badge badge-info mr-1">
          {props.name}{" "}
          <span className="badge badge-light" style={{ fontSize: props.level > 3 ? "1em" : "" }}>
            {props.level}
          </span>
        </span>
      ); 
   }
  
//   else {
//     return (
//       <span className="badge badge-info mr-1" key={index}>
//         {skill.name}{" "}
//         <span
//           className="badge badge-info"
//           style={{ fontSize: skill.level > 3 ? "1em" : "" }}
//         >
//           {skill.level}
//         </span>
//       </span>
//     );
//   }
}   
