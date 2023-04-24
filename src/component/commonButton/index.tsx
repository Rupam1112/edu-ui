import * as React from "react";
import Button from "@mui/material/Button";

interface CommonButtonProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: string;
  htmlType?: string;
  disabled?: boolean;
}

const CustomButton = ({
  label,
  onClick,
  className,
  htmlType,
  disabled,
}: CommonButtonProps) => {
  return (
    <>
      {htmlType ? (
        <Button
          variant="contained"
          onClick={onClick}
          className={className}
          type="submit"
          disabled={disabled}
        >
          {label}
        </Button>
      ) : (
        <Button variant="contained" onClick={onClick} className={className}>
          {label}
        </Button>
      )}
    </>
  );
};

const ErrorButton = ({
  label,
  onClick,
  className,
  disabled,
}: CommonButtonProps) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      className={className}
      color="error"
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

const CommonButton = (props: CommonButtonProps) => {
  if (props.type === "error") return <ErrorButton {...props} />;
  else return <CustomButton {...props} />;
};

export default CommonButton;
