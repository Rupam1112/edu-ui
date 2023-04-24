import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface CommonSelectProps<T extends { label: string }> {
  label?: string;
  required?: boolean;
  data: T[];
}
const CommonSelect = <T extends { label: string; value: string }>({
  label,
  required,
  data,
}: CommonSelectProps<T>) => {
  return (
    <div className="form-input">
      <label className="form-input-label">
        {label}
        {required ? <span className="required">*</span> : null}
      </label>
      <TextField select defaultValue={" "} className="form-input-field">
        {data.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default CommonSelect;
