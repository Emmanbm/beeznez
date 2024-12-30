import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const MultiSelectAutocomplete = ({ options, setValues, value }) => {
  const handleChange = (event, selectedOptions) => {
    // setValues(selectedOptions.map((option) => option.id));
    setValues((prev) => ({
      ...prev,
      users: selectedOptions.map((option) => option.id),
    }));
  };
  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option.fullName}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={handleChange}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          name='users'
          size='small'
          margin='dense'
          label='Sélectionnez des participants'
        />
      )}
    />
  );
};

export default MultiSelectAutocomplete;
