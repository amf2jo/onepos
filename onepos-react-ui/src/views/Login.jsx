import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useMatch } from 'react-router-dom'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  // FormGroup,
  // Form,
  // FormFeedback,
  // Input,
  Row,
  Col,
} from "reactstrap";

import { ErrorMessage, Formik, Form, Field } from 'formik'

import useAuth from '../hooks/useAuth'
import { AlertError } from "../components/ProcessError";

// import axios from 'axios'
import useAxios from '../hooks/useAxios';

const Login = (props) => {
  const navigate  = useNavigate();
  const isLogin = !useMatch('/menu/register');
  const [ loginError, setLoginError] = useState("");
  const { isAuth, login }  = useAuth();
  const { http } = useAxios("");
  const [ initialValues, setInitialValues ] = useState( { email: '', password: '' } );


  function onLoginSubmit(values, actions) {
    setLoginError();

    http.post("/login", values)
    .then(response => {
      console.log("login response", response.data);
      var res = login(response.headers.token);
      if (props.origin == "")
        navigate("/")
      else if (props.origin.indexOf("Login") >= 0)
        navigate("/")
      else
        navigate(props.origin);
    })
    .catch (error => {
      console.log("login error", error)
      setLoginError({...error, title :  "Failed in Login ..."});
    });

  }

  function onRegisterSubmit(values, actions) {

    setLoginError();

    http.post("/users", values)
    .then(response => {
      alert("Successful registering");
      navigate("/menu/login");     // 사용자 등록 후에는 로그인 화면으로 이동
    })
    .catch (error => {
      console.log("register error", error)
      setInitialValues(values);
      setLoginError({...error, title :  "Failed in Register ..."});
    });
  }

  const validateLoginForm = (values) => {
    const errors = {};
    if (!values.email)    errors.email = "E-mail 주소를 입력하세요."
    if (!values.password) errors.password = "password를 입력하세요"
    return errors;
  }

  const validateRegisterForm = (values) => {
    const errors = {};
    if (!values.email)    errors.email = "E-mail 주소가 필요합니다."
    if (!values.username) errors.username = "username이 필요합니다."
    if (!values.password) errors.password = "password를 입력하세요"
    else if (values.password.length < 4) errors.password = "Password는 최소 4글자 이상이어야 합니다.";

    if (!values['new-password']) errors['new-password'] = "password를 입력하세요."

    if (values['password'] != values['new-password']) errors['new-password'] = "password 가 불일치합니다. "
    return errors;
  }


   const Sign_in_or_up = () => {
    const state = { origin : props.location };
    if (isLogin) {
      return  <Link to="/menu/register" origin={origin.location}> Need an account ? </Link>
    } else {
      return <Link to="/menu/login" origin={origin.location}> Have an account ? </Link>
    }
  }


  const LoginFormik = () => {
    return (

      <Formik
        onSubmit={isLogin ?  onLoginSubmit : onRegisterSubmit}
        initialValues={isLogin ? initialValues :  {...initialValues, username: '', 'new-password': '' }}
        validate={isLogin ? validateLoginForm : validateRegisterForm}
      >
        {({ isSubmitting }) => (
          <>

            <Form>
              <fieldset className="form-group">
                <Field type="email" name="email" className="form-control form-control-lg" placeholder="Email" />
                <ErrorMessage name="email" component="div" />
              </fieldset>
              {!isLogin && (
                <fieldset className="form-group">
                  <Field
                    type="text"
                    name="username"
                    className="form-control form-control-lg"
                    placeholder="Your Name"
                  />
                  <ErrorMessage name="username" component="div" />
                </fieldset>
              )}
              <fieldset className="form-group">
                <Field
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  autoComplete="on"
                />
                 <ErrorMessage name="password" component="div" />
              </fieldset>
              {!isLogin && (
                <fieldset className="form-group">
                  <Field
                    type="password"
                    name="new-password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    autoComplete="on"
                  />
                   <ErrorMessage name="new-password" component="div" />
                </fieldset>
              )}
              <button disabled={isSubmitting} type="submit" className="btn btn-round btn-lg btn-primary pull-xs-right">
                Sign {isLogin ? 'in' : 'up'}
              </button>

            </Form>
          </>
        )}
      </Formik>
    )
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col><Card></Card></Col>
          <Col md="5">
            <Card color="danger" outline className="eztalk-outline-border">
              <CardHeader color="light">
                <CardSubtitle tag="h3">
                  <p></p>
                  <p>Sign-{isLogin ? 'in' : 'up'}</p>
                </CardSubtitle>
                <p className="title text-right">
                  <Sign_in_or_up />
                </p>
              </CardHeader>
              <p />

              <CardBody color="light" className="eztalk-card-body" >
                <LoginFormik />
              </CardBody>
            </Card>
          </Col>
          <Col><Card></Card></Col>
        </Row>
        { (loginError) ?  <AlertError Error={loginError} login="1" />: ""}
      </div>

    </>
  )

}


export default Login
