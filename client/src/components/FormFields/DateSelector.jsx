import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const DateSelector = ({
  label,
  name,
  onChange,
  register,
  required,
  ...otherProps
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    if (typeof onChange === "function") onChange(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        localeText={{ toolbarTitle: "Veuillez selectionner une date" }}
        label={label}
        value={selectedDate}
        defaultValue={dayjs()}
        onChange={handleDateChange}
        minDate={dayjs()}
        slotProps={{
          textField: {
            variant: "outlined",
            required: Boolean(required),
            fullWidth: true,
            name,
            margin: "dense",
            size: "small",
            ...register(name, { required: Boolean(required) }),
          },
          toolbar: {
            toolbarPlaceholder: "__",
            toolbarFormat: "DD / MM / YYYY",
            hidden: false,
          },
        }}
        {...otherProps}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
