import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
// import { AxiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";

const RegisterFarmer = props => {
  const { values, errors, touched, status, setFieldValue } = props;
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    console.log("status has changed!", status);
    status && setUsers([...users, status]);
    status && props.setCurrentFarmer(status);
    if (status !== undefined) {
      props.history.push("/dashboard-farmer");
    }
    console.log("Status: ", status);
    console.log("Users: ", users);
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
          <label htmlFor="profileImgURL">
            Profile Image URL
            <Field
              id="profileImgURL"
              type="text"
              name="profileImgURL"
              placeholder="Profile Image URL"
            />
            {touched.desciption && errors.desciption && (
              <p className="errors">{errors.profileImgURL}</p>
            )}
          </label>
          <button type="submit">Submit</button>
        </Form>
        {errorMsg ? <h3>{errorMsg}</h3> : null}
      </div>
    </div>
  );
};

const myMapPropsToValues = props => {
  console.log("myMapPropsToValues", props);
  return {
    username: props.username || "",
    password: props.password || "",
    city: props.city || "",
    state: props.state || "",
    zipCode: props.zipCode || "",
    profileImgURL: props.profileImgURL || "",
    props: props
  };
};

const myHandleSubmit = (values, { setStatus, resetForm, setErrors }) => {
  console.log("RegisterCustomer.js, POST RQ VALUES", values);
  axios
    .post(
      "https://farmers-fresh-api.herokuapp.com/api/farmers/register",
      values
    )
    .then(res => {
      console.log("RegisterFarmer.js, POST RES: ", res.data, res.data.token);
      localStorage.setItem("token", res.data.token);
      setStatus(res.data.newFarmer);
      resetForm();
    })
    .catch(err => {
      console.log("Register Customer ERROR: ", err.response.data.errorMessage);
      setErrors(err.response.data.errorMessage);
    });
};

const yupSchema = Yup.object().shape({
  username: Yup.string().required("This is required"),
  password: Yup.string().required("This is required"),
  city: Yup.string().required("This is required"),
  state: Yup.string().required("This is required"),
  zipCode: Yup.string().required("This is required"),
  profileImgURL: Yup.string().required("This is required")
});

const formikObj = {
  mapPropsToValues: myMapPropsToValues,
  handleSubmit: myHandleSubmit,
  validationSchema: yupSchema
};

const EnhancedFormHOC = withFormik(formikObj);

const EnhancedRegisterForm = EnhancedFormHOC(RegisterFarmer);

export default EnhancedRegisterForm;
