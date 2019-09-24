import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually

// export function MapBtn(props) {
//   return (
//     <div className="btn-muted map-btn" {...props} role="button" tabIndex="0">
//       <h2><i className="text-info fas fa-globe-americas"></i></h2>
//     </div>
//   );
// }

// export function MsgBtn(props) {
//   return (
//     <span className="btn btn-info msg-btn" {...props} role="button" tabIndex="0">
//      <span> Send Msg </span>
//     </span>
//   );
// }

export function PickBtn(props) {
  return (
    <span className="btn btn-success pick-btn" {...props} role="button" tabIndex="0">
     <span> Pick it </span>
    </span>
  );
};
