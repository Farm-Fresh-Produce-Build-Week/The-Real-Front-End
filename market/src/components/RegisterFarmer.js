import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const RegisterFarmer = ({ values, errors, touched, status, setFieldValue }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("status has changed!", status);
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div className="card">
      <div className="sign-form">
        <Form>
          <h2 style={{ color: "#14586b" }}>Sign Up to sell your produce</h2>
          <label htmlFor="name">
            Username
            <Field
              id="username"
              type="text"
              name="username"
              placeholder="username"
            />
            {touched.username && errors.username && (
              <p className="errors">{errors.username}</p>
            )}
          </label>

          <label htmlFor="password">
            Password
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="password"
            />
            {touched.password && errors.password && (
              <p className="errors">{errors.password}</p>
            )}
          </label>
          <label htmlFor="City">
            City
            <Field id="city" type="text" name="city" placeholder="city" />
            {touched.city && errors.city && (
              <p className="errors">{errors.city}</p>
            )}
          </label>
          <label htmlFor="state">
            State
            <Field id="state" type="text" name="state" placeholder="state" />
            {touched.state && errors.state && (
              <p className="errors">{errors.state}</p>
            )}
          </label>
          <label htmlFor="zipCode">
            Zip Code
            <Field
              id="zipCode"
              type="text"
              name="zipCode"
              placeholder="zip code"
            />
            {touched.zipCode && errors.zipCode && (
              <p className="errors">{errors.zipCode}</p>
            )}
          </label>
          <label htmlFor="desciption">
            Description
            <textarea
              id="desciption"
              type="textarea"
              name="desciption"
              placeholder="desciption"
            />
            {touched.desciption && errors.desciption && (
              <p className="errors">{errors.zipCode}</p>
            )}
          </label>
        </Form>
        <button type="submit">Submit</button>
      </div>
    </div>
  );
};

const FormikSignUp = withFormik({
  mapPropsToValues(props) {
    return {
      username: props.username || "",
      password: props.password || "",
      city: props.city || "",
      state: props.state || "",
      zipCode: props.zipCode || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("This is required"),
    password: Yup.string().required("This is required"),
    city: Yup.string().required("This is required"),
    state: Yup.string().required("This is required"),
    zipCode: Yup.string().required("This is required")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(RegisterFarmer);

export default FormikSignUp;
