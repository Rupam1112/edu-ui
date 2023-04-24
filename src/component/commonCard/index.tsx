import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CommonButton from "../commonButton";
import "./styles.scss";

interface CommonCardProps {
  className?: string;
  title: string;
  action: boolean;
  count?: number;
  headerButton?: boolean | false;
  handleClick?: () => void;
  onAdd?: () => void;
}
const CommonCard = ({
  className,
  title,
  action,
  count,
  headerButton,
  handleClick,
  onAdd,
}: CommonCardProps) => {
  const loggedInUser = window.localStorage.getItem("loggedInUser");
  let userLoggedIn: any = {};
  if (loggedInUser) {
    userLoggedIn = JSON.parse(loggedInUser);
  }
  const role = userLoggedIn.role;
  const showHeaderButton = () => {
    console.log("...title....", title, role);
    if (!headerButton) {
      return false;
    } else if (
      (role === "Staff" || role === "Student") &&
      title === "Schools"
    ) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Card sx={{ minWidth: 275 }} className={className}>
      <CardContent className={`${className}-content`}>
        <section className="header-box">
          {title} &nbsp; <b>{count}</b>
          {showHeaderButton() ? (
            <CommonButton
              label={`Add ${title}`}
              className="header-button"
              onClick={onAdd}
            />
          ) : null}
        </section>
      </CardContent>

      {action ? (
        <CardActions>
          <Button size="small" onClick={handleClick}>
            Learn More
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
};

export default CommonCard;
