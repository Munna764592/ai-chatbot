import { TextField } from "@mui/material";
import React from "react";

function CustomizedInput(props) {
  return (
    <div>
      <TextField
        InputLabelProps={{ style: { color: "white" } }}
        margin="normal"
        name={props.name}
        label={props.label}
        type={props.type}
        InputProps={{ style: { color: "white" } }}
      />
    </div>
  );
}

export default CustomizedInput;
