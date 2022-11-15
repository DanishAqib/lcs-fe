import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Navbar } from "../../components/Navbar";
import appLogoBlack from "../../assets/images/app-logo-black.png";
import { srAuthenticateUser } from "../../service/srUser";
import "./loginPage.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom"

export const LoginPage = () => {
    const navigate = useNavigate()
    const [isRoleSelected, setIsRoleSelected] = useState(false);
    const [userInfo, setUserInfo] = useState({
        u_email: "",
        u_password: "",
        u_role: "",
    });

    const onInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const onFormSubmit = (res) => {
        if ( !isRoleSelected ) {
            toast.error("Please select a role",{
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        if (res.status === "400") {
            toast.error(res.message,{
                position: toast.POSITION.TOP_CENTER
            });
        }
        else if (res.status === "200") {
            localStorage.setItem("userInfo", JSON.stringify(res.user));
            localStorage.setItem("isLoggedIn", true);
            if (userInfo.u_role === "lawyer") {
                navigate("/lawyer-dashboard");
            }
            else {
                navigate("/client-dashboard");
            }
            navigate(0);
        }
        else{
            toast.error("Something went wrong",{
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

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
                        <div className="content__container-form">
                            <div className="form__title">
                                <h2>Login <span>E-Lawyer</span></h2>
                                <p>Access to our dashboard</p>
                            </div>
                            <Form className="form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    srAuthenticateUser(userInfo).then((res) => {
                                        onFormSubmit(res);
                                    });
                                }}
                            >
                                <Form.Group controlId="formBasicEmail" className="form-group">
                                    <Form.Control className="input" type="email" placeholder="Enter email" name="u_email" required
                                        autoFocus
                                        value={userInfo.u_email}
                                        onChange={onInputChange}
                                        style={{ width: "98.5%", fontSize: "16px", color: "#000" }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword" className="form-group">
                                    <Form.Control className="input" type="password" placeholder="Enter Password" name="u_password" required
                                        value={userInfo.u_password}
                                        onChange={onInputChange}
                                        style={{ width: "98.5%", fontSize: "16px", color: "#000" }}
                                    />    
                                </Form.Group>
                                <Form.Group controlId="formBasicRole" className="form-group">
                                    <Form.Control className="input" as="select" name="u_role"
                                        defaultValue="select role"
                                        onChange={(e) => {
                                            setIsRoleSelected(true);
                                            onInputChange(e);
                                        }}
                                        style={{ width: "101.5%", fontSize: "16px", color: "#000" }}>
                                        <option value="select role" disabled>
                                            Select Role
                                        </option>
                                        <option value="lawyer">Lawyer</option>
                                        <option value="client">Client</option>
                                    </Form.Control>
                                </Form.Group>
                                {/* <div className="forgot-pass-link">
                                    <Link to="/forgot-password" className="forgotPass">Forgot Password?</Link>
                                </div> */}
                                <div className="login-form-footer">
                                    <Button className="button login-btn" variant="primary" type="submit">
                                        Submit
                                    </Button>
                                    <p>Don't Have an Account? <Link className="signupLink" to="/signup">SignUp</Link></p>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
