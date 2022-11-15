import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar';
import { formatDateAndTime, getCurrentUserSession } from '../../shared/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./clientCurrentAppointmentPage.css";
import { srGetAllClientAppointmentRequests, srCancelAppointment } from '../../service/srAppointment';
import AppointmentDetailsDialog from '../../components/AppointmentDetailsDialog';

export const ClientCurrentAppointmentPage = () => {
    const currentUser = getCurrentUserSession();
    if (!currentUser) {
        window.location.href = "/login";
    }

    const [appointments, setAppointments] = useState([]);
    const [appointmentInfo, setAppointmentInfo] = useState({
        car_request_datetime: '',
        car_title: '',
        car_description: '',
    });

    useEffect(() => {
        srGetAllClientAppointmentRequests(currentUser.u_id).then((res) => {
            if (res.status === "200") {
                setAppointments(res.appointments.filter((appointment) => appointment.car_status !== 'completed'));
            }
        })
    }, [currentUser.u_id]);

    const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
    return (
        <>
            <div className="page-container"
                style={{ pointerEvents: isAppointmentDialogOpen ? 'none' : 'auto',
                filter: isAppointmentDialogOpen ? 'blur(4px)' : 'none',
                opacity: isAppointmentDialogOpen ? '0.4' : '1'
              }}
            >
                <Navbar />
                <div className="current-appointment-page-content">
                    <div className="current-appointment-page__header">
                        <h2 className='content-title'>Current Appointments</h2>
                        <p>Following are the details of all the pending or approved appointments with the lawyers.</p>
                    </div>
                    <div className="current-appointment-page__body">
                        {
                            appointments.length > 0 ? (
                                <div className="list">
                                    {
                                        appointments.map((appointment) => {
                                            const { car_id, car_status, car_request_datetime, car_title, car_description, lawyer } = appointment;
                                            const { li_services_name, u_firstname, u_lastname, u_city, lawyerImage } = lawyer;

                                            return <div className="list__item" key={car_id}>
                                                <div className="list__item__header">
                                                    <div className="list__item__image">
                                                        <img src={lawyerImage} alt="profile" />
                                                    </div>
                                                    <div className="list__item__info">
                                                        <h3>{u_firstname} {u_lastname}</h3>
                                                        <h3>{u_city}</h3>
                                                        <p>{li_services_name}</p>
                                                        <button className="list__item__info__appt-details"
                                                            onClick={() => {
                                                                setAppointmentInfo({
                                                                    car_request_datetime,
                                                                    car_title,
                                                                    car_description
                                                                });
                                                                setIsAppointmentDialogOpen(true)
                                                            }}
                                                        >View Appointment Details</button>
                                                    </div>
                                                </div>
                                                <div className="list__item__footer">
                                                    <div className="list__item__footer__status">
                                                        <p>Status: <span
                                                            style={{ color: car_status === 'pending' ? '#ff7300' : car_status === 'approved' ? '#00b300' : '#ff0000' }}
                                                        >{car_status}</span></p>
                                                    </div>
                                                    <div className="list__item__footer__actions">
                                                        {
                                                            car_status !== 'approved' ? (
                                                                <button className="list__item__footer__actions"
                                                                    onClick={() => {
                                                                        srCancelAppointment(car_id).then((res) => {
                                                                            if (res.status === "200") {
                                                                                toast.success(res.message,{
                                                                                    position: "top-center",
                                                                                });
                                                                                setAppointments(appointments.filter((appointment) => appointment.car_id !== car_id));
                                                                            } else {
                                                                                toast.error("Something went wrong");
                                                                            }
                                                                        })
                                                                    }}
                                                                >{car_status === "rejected" ? "Remove" : "Cancel"} Request</button>
                                                            ) : <h3 className='list__item__footer__message'>Please consult the lawyer on requested date and time at {formatDateAndTime(car_request_datetime)}</h3>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            ) : (
                                <h3 className='no-apt-message'>You currently have no current appointments.</h3>
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
                    />
                )
            }
            <ToastContainer />
        </>
    )
}