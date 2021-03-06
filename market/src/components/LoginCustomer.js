import React, { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
// import { AxiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";

const LoginCustomer = props => {
  // console.log("Login Customer props: ", props);
  const { values, errors, touched, status, setFieldValue } = props;
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    console.log("status has changed!", status);
    status && setUsers([...users, status]);
    status && props.setCurrentUser(status);
    // errors && setErrorMsg(errors);
    if (status !== undefined) {
      props.history.push("/dashboard-customer");
    }
    console.log("Status: ", status);
    console.log("errors", errors);

    // }
  }, [status]);

  // redirects customer to dashboard if already logged in
  if (localStorage.getItem("user-token")) {
    return <Redirect to="/dashboard-customer" />;
  }

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
          <button type="submit">Submit</button>
        </Form>
        {/* {errorMsg && <p>{errorMsg}</p>} */}
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
      .post("https://farmers-fresh-api.herokuapp.com/api/users/login", values)
      .then(res => {
        console.log("Login Customer success, RES: ", res);
        localStorage.setItem("user-token", res.data.token);
        setStatus(res.data.user);
        resetForm();
      })
      .catch(err => {
        console.log(err.response.data.errorMessage);
        // setErrors(err.response.data.errorMessage);
      });
  }
})(LoginCustomer);

export default FormikSignUp;
