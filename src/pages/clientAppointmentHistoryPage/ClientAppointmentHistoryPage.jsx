import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar';
import { getCurrentUserSession } from '../../shared/utils';
import { GiveReviewDialog } from '../../components/GiveReviewDialog';
import { srGetAllClientAppointmentRequests } from '../../service/srAppointment';
import AppointmentDetailsDialog from '../../components/AppointmentDetailsDialog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./clientAppointmentHistoryPage.css";


export const ClientAppointmentHistoryPage = () => {
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

    const [lawyer_id, setLawyer_id] = useState("");

    useEffect(() => {
        srGetAllClientAppointmentRequests(currentUser.u_id).then((res) => {
            if (res.status === "200") {
                setAppointments(res.appointments.filter((appointment) => appointment.car_status === 'completed'));
            }
        })
    }, [currentUser.u_id]);

    const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
    const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);

    return (
    <>
        <div className="page-container"
            style={{ pointerEvents: isAppointmentDialogOpen || isRatingDialogOpen ? 'none' : 'auto',
            filter: isAppointmentDialogOpen || isRatingDialogOpen ? 'blur(4px)' : 'none',
            opacity: isAppointmentDialogOpen || isRatingDialogOpen ? '0.4' : '1'
          }}
        >
            <Navbar />
            <div className="current-appointment-page-content">
                <div className="current-appointment-page__header">
                    <h2 className="content-title">Appointment History</h2>
                    <p>Following is the list of all your previous completed appointments with the lawyers.</p>
                </div>
                <div className="current-appointment-page__body">
                    {
                        appointments.length > 0 ? (
                            <div className="list">
                                {
                                    appointments.map((appointment) => {
                                        const { car_id, car_status, car_request_datetime, car_title, car_description, lawyer } = appointment;
                                        const { u_id, li_services_name, u_firstname, u_lastname, u_city, lawyerImage } = lawyer;
                                        return <div className="list__item" key={car_id}>
                                                    <div className="list__item__header">
                                                        <div className="list__item__image">
                                                            <img src={lawyerImage} alt="Lawyer" />
                                                        </div>
                                                        <div className="list__item__info">
                                                            <h3>{u_firstname} {u_lastname}</h3>
                                                            <h3>{u_city}</h3>
                                                            <p>{li_services_name}</p>
                                                            <button className="list__item__info__appt-details"
                                                                onClick={() => {
                                                                    setAppointmentInfo({
                                                                        car_id,
                                                                        car_request_datetime,
                                                                        car_title,
                                                                        car_description,
                                                                    });
                                                                    setIsAppointmentDialogOpen(true);
                                                                }}
                                                            >View Appointment Details</button>
                                                        </div>
                                                    </div>
                                                    <div className="list__item__footer">
                                                        <div className="list__item__footer__status">
                                                            <p>Status: <span style={{color: "#51a100"}}>{car_status}</span></p>
                                                        </div>
                                                        <div className="list__item__footer__actions history__page__actions">
                                                            <button className="list__item__footer__actions__btn review-btn"
                                                                style={{backgroundColor: '#3a59f7'}}
                                                                onClick={()=>{
                                                                    setAppointmentInfo({
                                                                        car_id,
                                                                        car_request_datetime,
                                                                        car_title,
                                                                        car_description,
                                                                    });
                                                                    setIsRatingDialogOpen(true)
                                                                    setLawyer_id(u_id)
                                                                }}
                                                            >Give Review</button>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    )
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
            isRatingDialogOpen && (
                <GiveReviewDialog
                    setIsRatingDialogOpen={setIsRatingDialogOpen}
                    lawyer_id={lawyer_id}
                    currentUser={currentUser}
                    appointment_id={appointmentInfo.car_id}
                />
            )
        }
        <ToastContainer />
    </>
  )
}
