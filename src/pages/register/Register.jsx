import React, { useEffect, useState } from "react";
import "./Register.css";
import { googleIcon, githubIcon, LogoSvg } from "../../assets/logoSVG/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignIn, setIsSignIn] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [authError, setAuthError] = useState({
    message: "",
    visibility: false,
    type: "SUCCESS",
  });

  const handleChangeEvent = (e) => {
    const { key, value } = e;
    setValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleActive = () => {
    setIsSignIn(!isSignIn);
  };

  useEffect(() => {
    setAlertMessage("");
    setValues({
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, [isSignIn]);

  const handleClickOnLoginBTN = async () => {
    let errorMsg;

    if (isSignIn) {
      if (!values.email && !values.password) {
        errorMsg = "Please, Enter your email id and password";
      } else if (!values.email) {
        errorMsg = "Please, Enter your email id";
      } else if (!values.password) {
        errorMsg = "Please, Enter password";
      } else {
        axios
          .post("http://localhost:8000/api/v1/users/signin", {
            email: values.email,
            password: values.password,
          })
          .then((data) => {
            navigate("/movies");
          })
          .catch((err) => {
            setAuthError({
              message: "Invalid email and password",
              visibility: true,
              type: "ERROR",
            });
          });
      }
    } else {
      if (!values.email && !values.password && !values.confirmPassword) {
        errorMsg = "Please, Enter your email id, password and confirm password";
      } else if (!values.email) {
        errorMsg = "Please, Enter your email id";
      } else if (!values.password) {
        errorMsg = "Please, Enter password";
      } else if (!values.confirmPassword) {
        errorMsg = "Please, Enter confirm password";
      } else {
        axios
          .post("http://localhost:8000/api/v1/users/register", {
            // username: values.email.substring(0, values.email.indexOf("@")),
            email: values.email,
            password: values.password,
            isAdmin: false,
          })
          .then((data) => {
            // navigate("/movies");
            setAuthError({
              message: "User Registered Successfully",
              visibility: true,
              type: "SUCCESS",
            });
          })
          .catch((err) => {
            setAuthError({
              message: "Unable to register user. Please, try again later.",
              visibility: true,
              type: "ERROR",
            });
          });
      }
    }

    setTimeout(() => {
      setAuthError({
        message: "",
        visibility: false,
        type: "",
      });
    }, 3000);

    setAlertMessage(errorMsg);
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div
          className={`imageContainer ${
            isSignIn ? "imageContainerSignIn" : "imageContainerSignUp"
          }`}
        />
        <div className={`signinContainer ${isSignIn ? "active" : ""}`}>
          <div className="logoContainer">
            <LogoSvg />
          </div>
          <div className="signinWelcomeMessageContainer">
            <h1>Welcome to Streamix</h1>
            <p>
              Streaming opens the door to a universe of entertainment, where
              every click brings you closer to your next favorite show.
            </p>
          </div>
          <div className="socialLoginContainer">
            <div className="loginWithMethod">
              <img src={googleIcon} alt="Google" className="socialIcon" />
              <button className="loginWithMethodBTN">
                Continue with Google
              </button>
            </div>
            <div className="loginWithMethod">
              <img src={githubIcon} alt="Github" className="socialIcon" />
              <button className="loginWithMethodBTN">
                Continue with Github
              </button>
            </div>
          </div>
          <div className="loginMethodSeperator">
            <span className="loginMethodSeperatorSpan">Or</span>
          </div>
          <div className="loginWithEmailContainer">
            {alertMessage ? (
              <p id="validationMessage" className="validationMessage">
                {alertMessage}
              </p>
            ) : null}
            <input
              type="text"
              className="continueWithEmailInput"
              placeholder="john.doe@gmail.com"
              value={values.email}
              onChange={(e) =>
                handleChangeEvent({ key: "email", value: e.target.value })
              }
            />
            <input
              type="password"
              className="passwordInput"
              placeholder="Enter your password"
              value={values.password}
              onChange={(e) =>
                handleChangeEvent({ key: "password", value: e.target.value })
              }
            />
            <button className="LoginBTN" onClick={handleClickOnLoginBTN}>
              Sign in
            </button>
            <div className="existingUserLoginContainer">
              <span>Don't have an account?</span>
              <span className="signUpLink" onClick={handleActive}>
                Sign up
              </span>
            </div>
          </div>
          <div className="termsAndConditionContainer">
            <label htmlFor="termsCheckbox">
              By Signing up, you agree to our <span>Terms of Services</span> &{" "}
              <span>Privacy Policy</span>
            </label>
          </div>
        </div>
        <div className={`signupContainer ${isSignIn ? "" : "active"}`}>
          <div className="logoContainer">
            <LogoSvg />
          </div>
          <div className="signinWelcomeMessageContainer">
            <h1>Welcome to Streamix</h1>
            <p>
              Streaming opens the door to a universe of entertainment, where
              every click brings you closer to your next favorite show.
            </p>
          </div>
          <div className="signUpWithEmailContainer">
            {alertMessage ? (
              <p id="validationMessage" className="validationMessage">
                {alertMessage}
              </p>
            ) : null}
            <input
              type="text"
              className="continueWithEmailInput"
              placeholder="john.doe@gmail.com"
              value={values.email}
              onChange={(e) =>
                handleChangeEvent({ key: "email", value: e.target.value })
              }
            />
            <input
              type="password"
              className="passwordInput"
              placeholder="Enter your password"
              value={values.password}
              onChange={(e) =>
                handleChangeEvent({ key: "password", value: e.target.value })
              }
            />
            <input
              type="password"
              className="confirmPasswordInput"
              placeholder="Re-enter your password"
              value={values.confirmPassword}
              onChange={(e) =>
                handleChangeEvent({
                  key: "confirmPassword",
                  value: e.target.value,
                })
              }
            />
            <button className="LoginBTN" onClick={handleClickOnLoginBTN}>
              Sign up
            </button>
            <div className="existingUserLoginContainer">
              <span>Already have an account?</span>
              <span className="signUpLink" onClick={handleActive}>
                Sign in
              </span>
            </div>
          </div>
          <div className="termsAndConditionContainer">
            <label htmlFor="termsCheckbox">
              By Signing up, you agree to our <span>Terms of Services</span> &{" "}
              <span>Privacy Policy</span>
            </label>
          </div>
        </div>
      </div>
      {authError.visibility ? (
        <div
          className={`alertMessage ${
            authError.type === "SUCCESS" ? "success" : "error"
          }`}
        >
          <span className="alertMessageSpan">{authError.message}</span>
          <span className="alertMessageCloseSpan">
            <IoMdClose
              onClick={() =>
                setAuthError({
                  message: "",
                  visibility: false,
                  type: "",
                })
              }
              style={{ height: "100%", width: "75%" }}
            />
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default Register;
