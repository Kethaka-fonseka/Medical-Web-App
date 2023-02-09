import React, { useState} from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function Login() {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [doctor, setDoctor] = useState(null);


  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const onFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8070/doctors/login", {
        userName: userName,
        password: password,
      })
      .then((res) => {
        const data = res.data;
        if (data === "Unauthorized") {
          alert("Username and Passwords are mismatched!!!!")
          window.location.href = "/login";
        } else {
          setDoctor(data);
          window.localStorage.setItem("username", doctor.userName);
          alert("Login Success");
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="wrapper bg-dark d-flex align-items-center justify-content-center w-100">
      <div className="login">
        <h2 className="mb-3">Login Form</h2>
        <form className="needs-validation" onSubmit={onFormSubmit}>
          <div className="form-group was-validated mb-2">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              className="form-control"
              onChange={onUserNameChange}
              required
            ></input>
            <div className="invalid-feedback">Please Enter Your User Name</div>
          </div>
          <div className="form-group was-validated mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={onPasswordChange}
              required
            ></input>
            <div className="invalid-feedback">Please Enter Your Password</div>
          </div>

          <div className="form-group form-check mb2">
            <label htmlFor="check" className="form-check-label">
              Remember me
            </label>
            <input type="checkbox" className="form-check-input"></input>
          </div>
          <button type="submit" className="btn btn-success w-100 mt-2">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
