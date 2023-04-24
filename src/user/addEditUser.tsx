import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import { MenuItem } from "@mui/material";
import CommonButton from "../component/commonButton";
import * as Yup from "yup";
import { TextField } from "formik-mui";
import "./styles.scss";
interface AddEditUserProps {
  onCancel: () => void;
  type?: string;
  userData?: any;
}
const AddEditUser = ({ onCancel, type, userData }: AddEditUserProps) => {
  const [state, setState] = useState({
    initialUser: {
      role: type === "edit" ? userData.role : "",
      name: type === "edit" ? userData.name : "",
      email: type === "edit" ? userData.email : "",
      phone: type === "edit" ? userData.phone : "",
      schoolId: type === "edit" ? userData.schoolId : "",
      password: type === "edit" ? userData.password : "",
    },
    isInitialValid: true,
    edit: type === "edit" ? true : false,
    schoolData: [{}],
  });
  const loggedInUser = window.localStorage.getItem("loggedInUser");
  let userLoggedIn: any = {};
  if (loggedInUser) {
    userLoggedIn = JSON.parse(loggedInUser);
  }
  const roles = [
    {
      value: "SA",
      label: "Super Admin",
    },
    {
      value: "ST",
      label: "Staff",
    },
    {
      value: "STD",
      label: "Student",
    },
  ];
  const data =
    userLoggedIn.role === "Staff"
      ? roles.filter((item) => item.value != "SA")
      : roles;

  const getSchools = async () => {
    let data;
    if (userLoggedIn.role === "Staff" || userLoggedIn.role === "Student") {
      data = await axios.get(
        `http://127.0.0.1:8000/schools/${userLoggedIn.schoolId}`
      );
      const isArray = data.data instanceof Array;
      if (isArray) {
        setState((st) => ({
          ...st,
          schoolData: data.data,
        }));
      } else {
        const array: any = [];
        array.push(data.data);
        setState((st) => ({
          ...st,
          schoolData: array,
        }));
      }
    } else {
      data = await axios.get("http://127.0.0.1:8000/schools");
      setState((st) => ({
        ...st,
        schoolData: data.data,
      }));
    }
  };
  useEffect(() => {
    getSchools();
  }, []);
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const userSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .test(
        "test-username",
        "Please use correct format for Username",
        (value) => {
          const name = /^[a-zA-Z0-9]{3,}$/;
          const isValidName = name.test(value);
          if (value && !isValidName) {
            return false;
          }
          return true;
        }
      ),

    email: Yup.string()
      .required("Email is required")
      .test("test-email", "Please use correct format for Email", (value) => {
        const isValidEmail = emailRegex.test(value);
        if (value && !isValidEmail) {
          return false;
        }
        return true;
      }),
    phone: Yup.number().required("Phone is required"),
    password: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters")
      .max(10, "Password must be less than 10 characters"),
  });

  interface AddEditUser {
    role: string;
    name: string;
    email: string;
    phone: string;
    schoolId?: string;
  }
  const handleAdd = async (value: AddEditUser) => {
    if (value.role === "Super Admin") {
      delete value.schoolId;
    }
    if (state.edit) {
      await axios.put(`http://127.0.0.1:8000/users/${userData.id}`, value);
    } else {
      await axios.post("http://127.0.0.1:8000/users", value);
    }
    onCancel();
  };
  const title = state.edit ? "Edit User" : "Add User";
  const disablePassword = () => {
    if (userLoggedIn.role === "Super Admin" || !state.edit) {
      return false;
    } else return true;
  };
  return (
    <div>
      <span className="page-header">{title} </span>
      <Formik
        enableReinitialize
        initialValues={state?.initialUser}
        validationSchema={userSchema}
        validateOnMount
        isInitialValid={!!state?.isInitialValid}
        onSubmit={(values) => {
          handleAdd(values);
        }}
      >
        {({ isValid, values }) => {
          return (
            <Form className="login-form">
              <>
                <section className="form-row">
                  <Field
                    component={TextField}
                    type="text"
                    name="role"
                    label="Role"
                    select
                    margin="normal"
                    className="input-field"
                    disabled={state.edit ? true : false}
                  >
                    {data.map((option) => (
                      <MenuItem key={option.value} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </section>
                <section className="form-row">
                  <Field
                    component={TextField}
                    label="Name"
                    name="name"
                    className="input-field"
                  />
                </section>
                <section className="form-row ">
                  <Field
                    component={TextField}
                    label="Password"
                    name="password"
                    type="password"
                    className="input-field"
                    disabled={disablePassword()}
                  />
                </section>
                <section className="form-row ">
                  <Field
                    component={TextField}
                    label="Email"
                    name="email"
                    type="email"
                    className="input-field"
                  />
                </section>
                <section className="form-row ">
                  <Field
                    component={TextField}
                    label="Phone"
                    name="phone"
                    type="tel"
                    className="input-field"
                  />
                </section>
                <section className="form-row">
                  <Field
                    component={TextField}
                    type="text"
                    name="schoolId"
                    label="School"
                    select
                    margin="normal"
                    className="input-field"
                    disabled={values.role === "Super Admin" ? true : false}
                  >
                    {state.schoolData.map((option: any) => (
                      <MenuItem key={option.name} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Field>
                </section>
              </>

              <section className="form-row">
                <CommonButton
                  label={state.edit ? "Update" : "Add"}
                  htmlType="submit"
                  disabled={!isValid}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <CommonButton label="Cancel" onClick={onCancel} type="error" />
              </section>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default AddEditUser;
