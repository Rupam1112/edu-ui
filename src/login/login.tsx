import React, { useState } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CommonButton from "../component/commonButton";
import { TextField } from "formik-mui";

import "./styles.scss";

const Login = () => {
  const [state, setState] = useState({
    initialValuesLogin: {
      email: "",
      password: "",
    },
    isInitialValid: true,
    error: "",
  });
  const history = useNavigate();
  const handleForgotPassword = () => {
    history("/forget-password");
  };
  interface FormValues {
    email: string;
    password: string;
  }
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const credentialSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .test("test-email", "Please use correct format for Email", (value) => {
        const isValidEmail = emailRegex.test(value);
        if (value && !isValidEmail) {
          return false;
        }
        return true;
      }),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(60, "Password must be maximum 60 characters"),
  });
  const handleLogin = async (values: FormValues) => {
    const { data } = await axios.post("http://127.0.0.1:8000/login", values);
    if (data?.status === "200") {
      history("/dashboard", {
        state: {
          loggedInUser: data.data,
        },
      });
      localStorage.setItem("loggedInUser", JSON.stringify(data?.data));
    } else {
      setState((st) => ({
        ...st,
        error: data?.message,
      }));
    }
  };
  const isError = state.error ? true : false;
  return (
    <div className="login-page-container">
      <section className="login-form-wrapper">
        <section className="login-form-container">
          <div className="heading">
            <p className="heading-text">EduSmart</p>
          </div>
          <p className="welcome">Welcome</p>
          <p className="info">Log in to continue</p>
          <Formik
            enableReinitialize
            initialValues={state?.initialValuesLogin}
            validationSchema={credentialSchema}
            validateOnMount
            isInitialValid={!!state?.isInitialValid}
            onSubmit={(values) => {
              handleLogin(values);
            }}
          >
            {({ isValid, resetForm, errors }) => {
              return (
                <Form className="login-form">
                  <>
                    <section className="login-form-row">
                      <Field
                        component={TextField}
                        label="Email"
                        name="email"
                        className="input-field"
                      />
                    </section>
                    <section className="login-form-row">
                      <Field
                        component={TextField}
                        label="Password"
                        name="password"
                        type="password"
                        className="input-field"
                      />
                    </section>
                  </>
                  {state.error && (
                    <p className="error-message">
                      <span>{state.error}</span>
                    </p>
                  )}
                  <p className="forget-password">
                    <span onClick={handleForgotPassword}>
                      <b>Forget Password?</b>
                    </span>
                  </p>

                  <section className="login-form-row">
                    <CommonButton
                      label="Log In"
                      htmlType="submit"
                      disabled={!isValid || isError}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <CommonButton
                      label="Reset"
                      onClick={() => {
                        resetForm();
                        setState((st) => ({
                          ...st,
                          error: "",
                        }));
                      }}
                      type="error"
                      disabled={!isError}
                    />
                  </section>
                </Form>
              );
            }}
          </Formik>
        </section>
      </section>
    </div>
  );
};

export default Login;
