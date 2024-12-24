import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const CustomSelect = ({ options, onChange, label, value, ...otherProps }) => {
  const [selectedValue, setSelectedValue] = React.useState(value);
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (typeof onChange === "function") {
      onChange(newValue);
    }
  };
  return (
    <FormControl {...otherProps}>
      <InputLabel id={`demo-simple-select-${label}`}>{label}</InputLabel>
      <Select
        value={selectedValue}
        labelId={`demo-simple-select-${label}`}
        label={label}
        onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
