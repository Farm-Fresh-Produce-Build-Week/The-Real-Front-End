import React, { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
// import { AxiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";

const LoginFarmer = props => {
  // console.log("LoginFarmer.js, props: ", props);
  const { values, errors, touched, status, setFieldValue } = props;
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    console.log("status has changed!", status);
    status && setUsers([...users, status]);
    status && props.setCurrentFarmer(status.user);
    if (status !== undefined) {
      props.history.push("/dashboard-farmer");
    }
    console.log("Status: ", status);
    console.log("Users: ", users);
  }, [status]);

  // redirects farmer to dashboard if already logged in
  if (localStorage.getItem("token")) {
    return <Redirect to="/dashboard-farmer" />;
  }

  return (
    <div className="card">
      <div className="sign-form">
        <Form>
          <h2 style={{ color: "#14586b" }}>Farmer Sign In</h2>
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
          <button type="submit">Submit</button>
        </Form>
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

  handleSubmit(values, { setStatus, resetForm, setErrors }) {
    console.log("submitting", values);
    axios
      .post("https://farmers-fresh-api.herokuapp.com/api/farmers/login", values)
      .then(res => {
        console.log("Farmer Customer success, RES: ", res);
        localStorage.setItem("token", res.data.token);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response.data.errorMessage));
  }
})(LoginFarmer);

export default FormikSignUp;
