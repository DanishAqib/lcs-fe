import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar';
import { getCurrentUserSession } from '../../shared/utils';
import { srGetAllLawyerAppointmentRequests } from '../../service/srAppointment';
import { srGetReviewOnAppointment } from '../../service/srLawyer';
import AppointmentDetailsDialog from '../../components/AppointmentDetailsDialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./lawyerAppointmentHistoryPage.css";
import { ClientReviewDialog } from '../../components/ClientReviewDialog';

export const LawyerAppointmentHistoryPage = () => {
    const currentUser = getCurrentUserSession();
    if (!currentUser) {
        window.location.href = "/login";
    }

    const [appointments, setAppointments] = useState([]);
    const [appointmentInfo, setAppointmentInfo] = useState({
        car_id: '',
        car_request_datetime: '',
        car_title: '',
        car_description: '',
    });

    useEffect(() => {
        srGetAllLawyerAppointmentRequests(currentUser.u_id).then((res) => {
            if (res.status === "200") {
                setAppointments(res.appointments.filter((appointment) => appointment.car_status === 'completed'));
            }
        })
    }, [currentUser.u_id]);

    const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
    const [isClientReviewDialogOpen, setIsClientReviewDialogOpen] = useState(false);

    const [clientReview, setClientReview] = useState({
        cr_review: '',
        cr_rating: 0,
        u_firstname: '',
        u_lastname: '',
    });

    const getClientReview = (car_id) => {
        srGetReviewOnAppointment(car_id).then((res) => {
            if (res.status === "200") {
                setClientReview(res.review);
                setIsClientReviewDialogOpen(true);
            }
            else{
                toast.error("No reviews added by client yet");
            }
        })
    }


    return (
        <>
            <div className="page-container"
                style={{ pointerEvents: isAppointmentDialogOpen || isClientReviewDialogOpen ? 'none' : 'auto',
                filter: isAppointmentDialogOpen || isClientReviewDialogOpen ? 'blur(4px)' : 'none',
                opacity: isAppointmentDialogOpen || isClientReviewDialogOpen ? '0.4' : '1'
              }}
            >
                <Navbar />
                <div className="current-appointment-page-content">
                    <div className="current-appointment-page__header">
                        <h2 className="content-title">Appointments History</h2>
                        <p>Following is the list of all your previous completed appointments with the clients.</p>
                    </div>
                    <div className="current-appointment-page__body">
                        {
                            appointments.length > 0 ? (
                                <div className="list">
                                    {
                                        appointments.map((appointment) => {
                                            const { car_id, car_status, car_request_datetime, car_title, car_description, client } = appointment;
                                            const { u_firstname, u_lastname, u_city, clientImage } = client;

                                            return <div className="list__item" key={car_id}>
                                                        <div className="list__item__header">
                                                            <div className="list__item__image">
                                                                <img src={clientImage} alt="profile" />
                                                            </div>
                                                            <div className="list__item__info l-apt-req"
                                                                style={{gap: '2rem'}}
                                                            >
                                                                <div>
                                                                    <h3>{u_firstname} {u_lastname}</h3>
                                                                    <p>{u_city}</p>
                                                                </div>
                                                                <button className="list__item__info__appt-details"
                                                                    onClick={() => {
                                                                        setAppointmentInfo({
                                                                            car_id,
                                                                            car_request_datetime,
                                                                            car_title,
                                                                            car_description,
                                                                        })
                                                                        setIsAppointmentDialogOpen(true);
                                                                    }}
                                                                >
                                                                    View Appointment Details
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="list__item__footer">
                                                            <div className="list__item__footer__status">
                                                                <p>Status: <span
                                                                    style={{color: 'green'}}
                                                                >{car_status}</span></p>
                                                            </div>
                                                            <div className="list__item__footer__actions history__page__actions">
                                                                <button className="list__item__footer__actions__btn"
                                                                    style={{
                                                                        backgroundColor: 'blue',
                                                                    }}
                                                                    onClick={() => {
                                                                        setAppointmentInfo({
                                                                            car_id,
                                                                            car_request_datetime,
                                                                            car_title,
                                                                            car_description,
                                                                        })
                                                                        getClientReview(car_id);
                                                                    }}
                                                                >
                                                                    View Client Review
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                        })
                                    }
                                </div>
                            ) : (
                                <h3 className='no-apt-message'>No Appointments History Found</h3>
                            )
                        }
                    </div>
                </div>
            </div>
            {
                isAppointmentDialogOpen && (
                    <AppointmentDetailsDialog
                        appointmentInfo={appointmentInfo}
                        setIsAppointmentDialogOpen={setIsAppointmentDialogOpen}
                        status="completed"
                    />
                )
            }
            {
                isClientReviewDialogOpen && (
                    <ClientReviewDialog 
                        setIsClientReviewDialogOpen={setIsClientReviewDialogOpen}
                        clientReview={clientReview}
                    />
                )
            }
            <ToastContainer />
        </>
    )
}