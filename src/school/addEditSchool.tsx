import React, { useState } from "react";
import axios from "axios";
import { Form, Formik, Field } from "formik";
import { MenuItem } from "@mui/material";
import CommonButton from "../component/commonButton";
// import CommonSelect from "../component/commonSelect";
import * as Yup from "yup";
import { TextField } from "formik-mui";
import "./styles.scss";
interface AddEditSchoolProps {
  onCancel: () => void;
  type?: string;
  schoolData?: any;
}
const AddEditSchool = ({ onCancel, type, schoolData }: AddEditSchoolProps) => {
  const [state, setState] = useState({
    initialValuesLogin: {
      name: type === "edit" ? schoolData.name : "",
      email: type === "edit" ? schoolData.email : "",
      phone: type === "edit" ? schoolData.phone : "",
      address: type === "edit" ? schoolData.address : "",
    },
    isInitialValid: true,
    edit: type === "edit" ? true : false,
  });

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
    address: Yup.string()
      .required("Address is required")
      .min(3, "Name must be at least 3 characters"),
  });

  interface AddEditUser {
    address: string;
    name: string;
    email: string;
    phone: string;
  }
  const handleAdd = async (value: AddEditUser) => {
    if (state.edit) {
      await axios.put(`http://127.0.0.1:8000/schools/${schoolData.id}`, value);
    } else {
      await axios.post("http://127.0.0.1:8000/schools", value);
    }
    onCancel();
  };
  const title = state.edit ? "Edit School" : "Add School";
  return (
    <div>
      <span className="page-header">{title} </span>
      <Formik
        enableReinitialize
        initialValues={state?.initialValuesLogin}
        validationSchema={userSchema}
        validateOnMount
        isInitialValid={!!state?.isInitialValid}
        onSubmit={(values) => {
          handleAdd(values);
        }}
      >
        {({ isValid }) => {
          return (
            <Form className="login-form">
              <>
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
                    label="Address"
                    name="address"
                    className="input-field"
                  />
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
export default AddEditSchool;
