import * as React from "react";
import clsx from "clsx";
import { styled, Box, Theme } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import CommonButton from "../commonButton";
import "./styles.scss";
const BackdropUnstyled = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme: Theme) => ({
  width: 400,
  bgcolor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  border: "2px solid currentColor",
  padding: "16px 32px 24px 32px",
});
interface CustomModalProps {
  open: boolean;
  handleChangePassword: () => void;
}
const CustomModal = ({ open, handleChangePassword }: CustomModalProps) => {
  return (
    <div>
      <Modal open={open} slots={{ backdrop: Backdrop }}>
        <Box sx={style}>
          <h2 id="unstyled-modal-title">Change Password</h2>
          <p id="unstyled-modal-description">
            An email has been sent to your registered email address. Please
            follow the instructions provided to change the password.
          </p>
          <CommonButton label="Close" onClick={handleChangePassword} />
        </Box>
      </Modal>
    </div>
  );
};
export default CustomModal;
