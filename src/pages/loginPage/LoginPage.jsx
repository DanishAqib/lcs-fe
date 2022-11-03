import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Navbar } from "../../components/Navbar";
import appLogoBlack from "../../assets/images/app-logo-black.png";

import "./loginPage.css";
import { Link } from "react-router-dom";

export const LoginPage = () => {
    return (
        <>
            <div className="login-page">
                <Navbar />
                <div className="login-page__content">
                    <div className="login-page__content__container">
                        <div className="login-page__content__left__logo">
                            <img src={appLogoBlack} alt="app-logo" />
                        </div>
                    </div>
                    <div className="login-page__content__container">
                        <div className="login-form">
                            <div className="login-form__title">
                                <h2>Login <span>E-Lawyer</span></h2>
                                <p>Access to our dashboard</p>
                            </div>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control className="input" type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control className="input" type="password" placeholder="Enter Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicRole">
                                    <Form.Control className="input" as="select">
                                        <option
                                            defaultValue={""}
                                            disabled={true}
                                            selected={true}
                                            hidden={true}
                                        >
                                            Select Role
                                        </option>
                                        <option>Lawyer</option>
                                        <option>Client</option>
                                    </Form.Control>
                                </Form.Group>
                                <div className="forgot-pass-link">
                                    <Link to="/forgot-password" className="forgotPass">Forgot Password?</Link>
                                </div>
                                <Button className="loginButton" variant="primary" type="submit">
                                    Submit
                                </Button>
                                <p>Don't Have an Account? <Link className="signupLink" to="/signup">SignUp</Link></p>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
