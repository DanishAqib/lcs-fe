import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getCurrentUserSession } from '../../shared/utils';
import { srGetUserInfo, srUpdateUser } from '../../service/srUser';
import { convertImageToBase64 } from "../../shared/utils";
import { ToastContainer, toast } from 'react-toastify';
import { UpdatePasswordDialog } from '../../components/UpdatePasswordDialog';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../../components/Navbar';
import "./updateProfilePage.css";

export const UpdateProfilePage = () => {
    const currentUser = getCurrentUserSession();
    if (!currentUser) {
      window.location.href = "/login";
    }

    const [userInfo, setUserInfo] = useState({});
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

    useEffect(() => {
        srGetUserInfo(currentUser.u_id)
            .then((res) => {
                if (res.status === "200") {
                    setUserInfo(res.user);
                }
                else {
                    toast.error("Something went wrong", {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            })
            .catch((err) => {
                toast.error("Something went wrong", {
                    position: toast.POSITION.TOP_CENTER
                });
            })
    }, [currentUser.u_id]);

    const updateUser = () => {
        srUpdateUser(userInfo.u_id, {u_info: userInfo})
            .then((res) => {
                if (res.status === "200") {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
                else {
                    toast.error("Something went wrong", {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            })
            .catch((err) => {
                toast.error("Something went wrong", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        )
        updateLocalStorage();
    }

    const updateLocalStorage = () => {
        let lsUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        lsUserInfo.u_firstname = userInfo.u_firstname;
        lsUserInfo.u_lastname = userInfo.u_lastname;
        lsUserInfo.u_email = userInfo.u_email;
        lsUserInfo.u_phone = userInfo.u_phone;
        lsUserInfo.u_city = userInfo.u_city;
        lsUserInfo.li_services_name = userInfo.li_services_name;
        localStorage.setItem("userInfo", JSON.stringify(lsUserInfo));
    }

    return (
        <>
            <div className='page-container'
                style={{ pointerEvents: isPasswordDialogOpen ? 'none' : 'auto',
                filter: isPasswordDialogOpen ? 'blur(4px)' : 'none',
                opacity: isPasswordDialogOpen ? '0.4' : '1'
              }}
            >
                <Navbar/>
                <div className='page-container__content'>
                    <h2 className='content-title'>Update Profile</h2>
                    <div className='page-container__content__body'>
                        <div className='page-container__content__body__left'>
                            <Form>
                                <Form.Group controlId="formBasicFName" className='form-group fg-update-prof'>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" disabled={!isInEditMode} defaultValue={userInfo.u_firstname} className="input update-prof-input" 
                                        onChange={(e) => userInfo.u_firstname = e.target.value} 
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicLName" className='form-group fg-update-prof'>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" disabled={!isInEditMode} defaultValue={userInfo.u_lastname}  className="input update-prof-input"
                                        onChange={(e) => userInfo.u_lastname = e.target.value}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail" className='form-group fg-update-prof'>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" disabled={!isInEditMode} defaultValue={userInfo.u_email} className="input update-prof-input"/>
                                </Form.Group>
                                <Form.Group controlId="formBasicLocation" className='form-group fg-update-prof'>
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control type="text" disabled={!isInEditMode} defaultValue={userInfo.u_city} className="input update-prof-input"
                                        onChange={(e) => userInfo.u_city = e.target.value}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPhone" className='form-group fg-update-prof'>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="text" disabled={!isInEditMode} defaultValue={userInfo.u_phone} className="input update-prof-input"
                                        onChange={(e) => userInfo.u_phone = e.target.value}
                                    />
                                </Form.Group>
                                {
                                    currentUser.u_role === "lawyer" && (
                                        <Form.Group controlId="formBasicServices" className='form-group fg-update-prof'>
                                            <Form.Label>Services</Form.Label>
                                            <Form.Control type="text" disabled={!isInEditMode} defaultValue={userInfo.li_services_name} className="input update-prof-input"
                                                onChange={(e) => userInfo.li_services_name = e.target.value}
                                            />
                                         </Form.Group>
                                    )
                                }
                                <div className='update-prof-btns'>
                                    <Button className="button change__pass__btn"
                                        onClick={() => setIsPasswordDialogOpen(true)}
                                    >Change Password</Button>
                                </div>
                            </Form>
                        </div>
                        <div className='page-container__content__body__right'>
                            <div className='page-container__content__body__right__image'>
                                <img src={userInfo.ui_image} alt="profile" className='user-image'/>
                            </div>
                            <Form.Group controlId="formBasicFile" className='form-group change-prof-fg'>
                                <Form.Label>Change Profile Picture</Form.Label>
                                <Form.Control type="file" className="prof-select-input" disabled={!isInEditMode} 
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={(e) => {
                                        convertImageToBase64(e.target.files[0])
                                            .then((base64) => {
                                                setUserInfo({
                                                    ...userInfo,
                                                    ui_image: base64
                                                })
                                            })
                                        }}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='page-container__content__footer'>
                        <Button variant="primary" type="submit" className='update-prof-btn edit-btn'
                            onClick={() => {
                                if (isInEditMode) {
                                    updateUser();
                                }
                                setIsInEditMode(!isInEditMode);
                            }}
                            style={{
                                backgroundColor: isInEditMode ? "#ff0000" : "#007bff",
                                color: isInEditMode ? "#fff" : "#fff"
                            }}
                        >
                            {isInEditMode ? "Update" : "Edit"}
                        </Button>
                        <Button variant="secondary" type="button" className='update-prof-btn cancel-btn'
                            onClick={() => {
                                if (isInEditMode) {
                                    window.location.reload();
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
            {
                isPasswordDialogOpen && (
                    <UpdatePasswordDialog 
                        setIsPasswordDialogOpen={setIsPasswordDialogOpen}
                        user_id={userInfo.u_id}
                    />
                )
            }
            <ToastContainer />
        </>
    );
}
