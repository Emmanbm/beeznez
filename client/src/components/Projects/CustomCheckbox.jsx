import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function CustomCheckbox({
  options = [],
  optionLabel,
  name,
  setValues,
}) {
  const [checkedValues, setCheckedValues] = React.useState(
    options?.map((option) => ({ checked: false, ...option }))
  );

  const handleCheckAll = (event) => {
    const newValues = checkedValues.map((option) => ({
      ...option,
      checked: event.target.checked,
    }));
    setCheckedValues(newValues);
    setValues((prev) => ({
      ...prev,
      [name]: newValues
        .filter((option) => option.checked)
        .map((option) => option.id),
    }));
    // setValues(
    //   name,
    //   newValues.filter((option) => option.checked).map((option) => option.id)
    // );
  };

  const handleChange = (event, id) => {
    const newValues = checkedValues.map((option) =>
      option.id === id
        ? { ...option, checked: event.target.checked }
        : { ...option }
    );
    setCheckedValues(newValues);
    setValues(
      name,
      newValues.filter((option) => option.checked).map((option) => option.id)
    );
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
      {checkedValues.map((option) => (
        <FormControlLabel
          key={option.id}
          label={option[optionLabel]}
          control={
            <Checkbox
              checked={option.checked}
              onChange={(event) => handleChange(event, option.id)}
            />
          }
        />
      ))}
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label='Séléctionner les participants'
        control={
          <Checkbox
            checked={checkedValues.every((option) => option.checked)}
            indeterminate={checkedValues.some(
              (option) => option.checked !== checkedValues[0].checked
            )}
            onChange={handleCheckAll}
          />
        }
      />
      {children}
    </div>
  );
}
