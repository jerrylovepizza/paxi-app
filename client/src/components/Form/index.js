import React from "react";
import "./style.css";

export function Form(props) {
  return (
    <div id="form">
      {props.children}
    </div>
  );
}

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control mx-auto input" {...props} value={props.children} />
    </div>
  );
}

export function Textarea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control mx-auto input" id="message-text" {...props} value={props.children} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ marginBottom: 10 }} type="submit" className={props.btncolor}>
      {props.children}
    </button>
  );
}
