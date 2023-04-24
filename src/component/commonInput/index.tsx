import React from "react";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "./styles.scss";
interface CommonInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
  onChange?: (event: React.SyntheticEvent<EventTarget>) => void;
  value?: string;
}

const InputField = ({ label }: CommonInputProps) => {
  return <TextField className="input-field" label={label} variant="outlined" />;
};

const InputPassword = ({ name, onChange, value }: CommonInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <InputLabel>Password</InputLabel>
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        name={name}
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
};

const FormInput = ({
  label,
  placeholder,
  required,
  name,
  onChange,
  value,
}: CommonInputProps) => {
  return (
    <div className="form-input">
      <label className="form-input-label">
        {label}
        {required ? <span className="required">*</span> : null}
      </label>
      <TextField
        className="form-input-field"
        variant="outlined"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

const CommonInput = (props: CommonInputProps) => {
  if (props.type === "password") return <InputPassword />;
  else if (props.type === "form") return <FormInput {...props} />;
  else return <InputField {...props} />;
};

export default CommonInput;
