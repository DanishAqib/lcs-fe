import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Navbar } from "../../components/Navbar";
import appLogoBlack from "../../assets/images/app-logo-black.png";
import "./forgotPasswordPage.css";

export const ForgotPasswordPage = () => {
    return (
        <>
            <div className="forgot-password-page">
                <Navbar />
                <div className="forgot-password-page__content">
                    <div className="forgot-password-page__content__container">
                        <div className="forgot-password-page__content__left__logo">
                            <img src={appLogoBlack} alt="app-logo" />
                        </div>
                    </div>
                    <div className="forgot-password-page__content__container">
                        <div className="content__container-form">
                            <div className="form__title">
                                <h2>Forgot Password</h2>
                                <p>Enter your email address to reset your password</p>
                            </div>
                            <Form className="form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <Form.Group controlId="formBasicEmail" className="form-group"
                                    style={{ width: "98.5%", fontSize: "16px", color: "#000" }}
                                >
                                    <Form.Control className="input" type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group controlId="formBasicNewPassword" className="form-group"
                                    style={{ width: "98.5%", fontSize: "16px", color: "#000" }}
                                >
                                    <Form.Control className="input" type="password" placeholder="Enter New Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicConfirmPassword" className="form-group"
                                    style={{ width: "98.5%", fontSize: "16px", color: "#000" }}
                                >
                                    <Form.Control className="input" type="password" placeholder="Confirm Password" />
                                </Form.Group>
                                <div className="login-form-footer">
                                    <Button className="button login-btn" variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}