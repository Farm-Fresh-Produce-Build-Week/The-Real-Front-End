import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { AxiosWithAuth } from "../utils/axiosWithAuth";

const LoginCustomer = ({ values, errors, touched, status, setFieldValue }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("status has changed!", status);
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div className="card">
      <div className="sign-form">
        <Form>
          <h2 style={{ color: "#14586b" }}>Customer Sign In</h2>
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
      password: props.password || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("This is required"),
    password: Yup.string().required("This is required")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    AxiosWithAuth()
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(LoginCustomer);

export default FormikSignUp;
