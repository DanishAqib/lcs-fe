import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Navbar } from "../../components/Navbar";
import appLogoBlack from "../../assets/images/app-logo-black.png";
import { srCreateUser } from "../../service/srUser";
import { convertImageToBase64 } from "../../shared/utils";
import "./signupPage.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom"

export const SignupPage = () => {
    const [isLawyer, setIsLawyer] = useState(false);
    const [isRoleSelected, setIsRoleSelected] = useState(false);
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({
        u_firstname: "",
        u_lastname: "",
        u_email: "",
        u_city: "",
        u_phone: "",
        u_role: "",
        u_services: "",
        u_password: "",
        u_cPassword: "",
    });

    const [isProflePicSelected, setIsProfilePicSelected] = useState(false);

    const onInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const checkIfPasswordMatch = () => {
        if (userInfo.u_password !== userInfo.u_cPassword) {
            toast.error("Password does not match",{
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        return true;
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
            navigate("/login");
        }
        else{
            toast.error("Something went wrong",{
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    return (
        <>
            <div className="signup-page">
                <Navbar />
                <div className="signup-page__content ">
                    <div className="signup-page__content__container signup-form-container" style={{marginTop:"3.5rem", height: "85%"}}>
                        <div className="signup-page__content__left__logo">
                            <img src={appLogoBlack} alt="app-logo" />
                        </div>
                    </div>
                    <div className="signup-page__content__container ">
                        <div className="content__container-form">
                            <div className="form__title">
                                <h2>Register <span>E-Lawyer</span></h2>
                                <p>Access to our dashboard</p>
                            </div>
                            <Form className="form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (checkIfPasswordMatch() && isProflePicSelected) {
                                        srCreateUser(userInfo).then((res) => {
                                            onFormSubmit(res);
                                        });
                                    }
                                }}
                            >
                                <Form.Group controlId="formBasicName" className="form-group">
                                    <Form.Control className="input" type="text" placeholder="Enter First Name" name="u_firstname"
                                        value={userInfo.u_firstname}
                                        onChange={onInputChange}
                                        style={{ width: "50%", fontSize: "16px", color: "#000" }}
                                    />
                                    <Form.Control className="input" type="text" placeholder="Enter Last Name" name="u_lastname"
                                        value={userInfo.u_lastname}
                                        onChange={onInputChange}
                                        style={{ width: "50%", fontSize: "16px", color: "#000" }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail" className="form-group">
                                    <Form.Control className="input" type="email" placeholder="Enter Email" name="u_email"
                                        value={userInfo.u_email}
                                        onChange={onInputChange}
                                        style={{ width: "98.5%", fontSize: "16px", color: "#000" }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicProfilePic" className="form-group"
                                    style={{ display: "flex", flexDirection: "column", alignItems: "start" }}
                                >
                                    <label htmlFor="profile-pic" className="profile-pic-label"
                                        style={{ display: isProflePicSelected ? "none" : "block" }}
                                    >
                                        Upload Profile Picture
                                    </label>
                                    <Form.Control className="input file-upload" type="file" placeholder="Upload Profile Pic"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={(e) => {
                                            convertImageToBase64(e.target.files[0]).then((base64) => {
                                                setUserInfo({ ...userInfo, ui_image: base64 });
                                            });
                                            setIsProfilePicSelected(true);
                                        }}
                                        style={{ width: "96.5%", fontSize: "14px", color: "#000" }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicRole" className="form-group">
                                    <Form.Control className="input" as="select" name="u_role"
                                        defaultValue="select role"
                                        onChange={(e) => {
                                            setIsLawyer(e.target.value === "lawyer");
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
                                {
                                    isLawyer && (
                                        <>
                                            <Form.Group controlId="formBasic" className="form-group">
                                                <Form.Control className="input" type="text" placeholder="Enter Services" name="u_services"
                                                    value={userInfo.u_services}
                                                    onChange={onInputChange}
                                                    style={{ width: "98.5%", fontSize: "16px", color: "#000" }}
                                                />
                                            </Form.Group>
                                        </>
                                    )
                                }
                                <Form.Group controlId="formBasicCity" className="form-group">
                                    <Form.Control className="input" type="text" placeholder="Enter City" name="u_city"
                                        value={userInfo.u_city}
                                        onChange={onInputChange}
                                        style={{ width: "50%", fontSize: "16px", color: "#000" }}
                                    />
                                    <Form.Control className="input" type="text" placeholder="Phone Number" name="u_phone"
                                        value={userInfo.u_phone}
                                        onChange={onInputChange}
                                        style={{ width: "50%", fontSize: "16px", color: "#000" }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword" className="form-group">
                                    <Form.Control className="input" type="password" placeholder="Password" name="u_password"
                                        value={userInfo.u_password}
                                        onChange={onInputChange}
                                        style={{ width: "98.5%", fontSize: "16px", color: "#000" }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword" className="form-group">
                                    <Form.Control className="input" type="password" placeholder="Confirm Password" name="u_cPassword"
                                        value={userInfo.u_cPassword}
                                        onChange={onInputChange}
                                        style={{ width: "98.5%", fontSize: "16px", color: "#000" }}
                                    />
                                </Form.Group>
                                <div className="signup-form-footer" style={{marginTop:"1.5rem"}}>
                                    <Button className="button signup-btn" type="submit" variant="primary">
                                        Sign Up
                                    </Button>
                                    <p>Already have an account? <Link to="/login">Login</Link></p>
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