import React from "react";
import { useNavigate } from "react-router-dom";
import CommonInput from "../component/commonInput";
import CommonButton from "../component/commonButton";
import "../login/styles.scss";

const ForgetPassword = () => {
  const history = useNavigate();
  const handleBack = () => {
    history("/");
  };
  return (
    <div className="login-page-container">
      <section className="login-form-wrapper">
        <section className="login-form-container">
          <div className="heading">
            <p className="heading-text">EduSmart</p>
          </div>
          <p className="welcome">Forgot Your Password?</p>
          <span className="forget-password-info">
            Please enter your email address
          </span>
          <section className="form-row">
            <CommonInput label="Email address" />
          </section>

          <section className="form-row">
            <CommonButton label="Submit" />
          </section>
          <p className="back">
            <span onClick={handleBack}>
              <b>Back to Log In</b>
            </span>
          </p>
        </section>
      </section>
    </div>
  );
};
export default ForgetPassword;
