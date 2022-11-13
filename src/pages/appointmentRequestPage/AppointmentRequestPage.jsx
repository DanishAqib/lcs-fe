import React, { useEffect, useState } from 'react'
import { getCurrentUserSession } from '../../shared/utils';
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from '../../components/Navbar';
import { srGetAllLawyerReviews } from '../../service/srLawyer';
import { srCreateAppointment } from '../../service/srAppointment';
import { LawyerReviewsDialog } from '../../components/LawyerReviewsDialog';
import phoneIcon from '../../assets/icons/phone-icon.png';
import mailIcon from '../../assets/icons/mail-icon.png';
import locationIcon from '../../assets/icons/location-icon.png';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./appointmentRequestPage.css"
import ReactStars from "react-rating-stars-component";


export const AppointmentRequestPage = () => {
    const currentUser = getCurrentUserSession();
    if (!currentUser) {
        window.location.href = "/login";
    }

    const location = useLocation();
    const lawyerInfo = location.state.lawyerInfo;
    if (!lawyerInfo) {
        window.location.href = "/make-appointment";
    }
    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);

    const [appointmentInfo, setAppointmentInfo] = useState({
        car_client_id: currentUser.u_id,
        car_lawyer_id: lawyerInfo.u_id,
        car_title: '',
        car_description: '',
    });

    useEffect(() => {
        srGetAllLawyerReviews(lawyerInfo.u_id).then((res) => {
            if (res.status === "200") {
                setReviews(res.reviews);
                calculateAverageRating();
            }
        })
        
    }, [rating, lawyerInfo.u_id]);

    const calculateAverageRating = () => {
        const totalRating = reviews.reduce((acc, review) => {
            return acc + review.cr_rating;
        }, 0);
        const averageRating = Math.ceil(totalRating / reviews.length);
        setRating(averageRating);
    }

    const onInputChange = (e) => {
        setAppointmentInfo({
            ...appointmentInfo,
            [e.target.name]: e.target.value
        })
    }

    const [openReviewsDialog, setOpenReviewsDialog] = useState(false);

    return (
        <>
            <div className="page-container"
                style={{ pointerEvents: openReviewsDialog ? 'none' : 'auto',
                filter: openReviewsDialog ? 'blur(4px)' : 'none',
                opacity: openReviewsDialog ? '0.4' : '1'
              }}
            >
                <Navbar />
                <div className="appointment-request-page-content">
                    <div className="appointment-request-page__header">
                        <h2 className='content-title'>Appointment Request</h2>
                        <p>Please fill in the details of your appointment request with <span>{lawyerInfo.u_firstname}</span>.</p>
                    </div>
                    <div className="appointment-request-page__body">
                        <div className="appointment-request-page__body__form">
                            <h3 className='apd-title'>Appointment Details</h3>
                            <Form>
                                <Form.Group controlId="formBasicTitle" className="form-group">
                                    <Form.Control className="input" type="text" placeholder="Request Title" name="car_title"
                                        value={appointmentInfo.car_title}
                                        onChange={onInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicDescription" className="form-group">
                                    <Form.Control
                                        style={{ width:'100%' }}
                                    className="input form-msg__body" as="textarea" placeholder="Request Description..." name="car_description"
                                        value={appointmentInfo.car_description}
                                        onChange={onInputChange}
                                    />
                                </Form.Group>
                            </Form>
                            <div className='appointment-request-page__body__form__footer'>
                                <Button variant="primary" type="submit" className="button"
                                    onClick={() => {
                                        srCreateAppointment(appointmentInfo).then((res) => {
                                            if (res.status === "200") {
                                                toast.success(res.message,{
                                                    position: "top-center",
                                                });
                                            } else if (res.status === "400") {
                                                toast.error(res.message,{
                                                    position: "top-center",
                                                });
                                            }
                                            else{
                                                toast.error("Something went wrong!");
                                            }
                                        })
                                        setAppointmentInfo({
                                            car_client_id: currentUser.u_id,
                                            car_lawyer_id: lawyerInfo.u_id,
                                            car_title: '',
                                            car_description: '',
                                        })
                                    }}
                                >
                                    Send Request
                                </Button>
                                <Button variant="primary" type="submit" className="button dialog-cancel-btn"
                                    onClick={() => navigate(-1)}
                                > 
                                    Cancel
                                </Button>
                            </div>
                        </div>
                        <div className="make-appointment-page__body__lawyers__card arPage">
                            <div className="make-appointment-page__body__lawyers__card__image">
                                <img src={lawyerInfo.ui_image} alt="lawyer" />
                            </div>
                            <div className='lawyer-card__ratings'>
                                {
                                    !isNaN(rating) && (
                                        <ReactStars
                                            count={5}
                                            value={rating}
                                            size={24}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                    )
                                }
                            </div>
                            <div className="appointment-request-page__body__lawyer-card__info">
                                <h3>{lawyerInfo.u_firstname} {lawyerInfo.u_lastname}</h3>
                                <p>{lawyerInfo.li_services_name}</p>
                            </div>
                            <div className='appointment-req-card-details'>
                                <p className='lawyer-details-icon'>
                                    <img src={locationIcon} alt="location" />
                                    {lawyerInfo.u_city}</p>
                                <p className='lawyer-details-icon'>
                                    <img src={mailIcon} alt="mail" />
                                    {lawyerInfo.u_email}</p>
                                <p className='lawyer-details-icon'>
                                    <img src={phoneIcon} alt="phone"/>
                                    {lawyerInfo.u_phone}
                                </p>
                            </div>
                            <button className="client-reviews-btn"
                                onClick={() => setOpenReviewsDialog(true)}
                            >
                                View Client Reviews
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                openReviewsDialog && (
                    <LawyerReviewsDialog
                        reviews={reviews}
                        setOpenReviewsDialog={setOpenReviewsDialog}
                    />
                )
            }
            <ToastContainer />
        </>
    )
}