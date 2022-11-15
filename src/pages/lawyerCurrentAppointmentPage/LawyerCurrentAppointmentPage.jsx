import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar';
import { srGetAllLawyerAppointmentRequests, changeAppointmentStatus } from '../../service/srAppointment';
import { getCurrentUserSession } from '../../shared/utils';
import AppointmentDetailsDialog from '../../components/AppointmentDetailsDialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./lawyerCurrentAppointmentPage.css";

export const LawyerCurrentAppointmentPage = () => {
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
    const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);

    useEffect(() => {
        srGetAllLawyerAppointmentRequests(currentUser.u_id).then((res) => {
            if (res.status === "200") {
                setAppointments(res.appointments.filter((appointment) => appointment.car_status === 'approved'));
            }
        })
    }, [currentUser.u_id]);

    const onCompletedClick = (appointmentId, clientName) => {
        changeAppointmentStatus(appointmentId, 'completed').then((res) => {
            if (res.status === "200") {
                toast.success(`Appointment with ${clientName} marked as completed.`);
                setAppointments(appointments.filter((appointment) => appointment.car_id !== appointmentId));
            } else {
                toast.error(res.message);
            }
        })
    }

    return (
    <>
        <div className='page-container'
            style={{ pointerEvents: isAppointmentDialogOpen ? 'none' : 'auto',
            filter: isAppointmentDialogOpen ? 'blur(4px)' : 'none',
            opacity: isAppointmentDialogOpen ? '0.4' : '1'
          }}
        >
            <Navbar/>
            <div className="current-appointment-page-content">
                <div className="current-appointment-page__header">
                    <h2 className='content-title'>Current Appointments</h2>
                    <p>Following are the details of all the <b>In Progress</b> appointments with the clients. Please mark the appoinment as completed once the appointment has been completed.</p>
                </div>
                <div className="current-appointment-page__body">
                    {
                        appointments.length > 0 ? (
                            <div className="list">
                                {
                                    appointments.map((appointment) => {
                                        const {car_id, car_status, car_request_datetime, car_title, car_description, client } = appointment;
                                        const {u_firstname, u_lastname, u_city, clientImage} = client;

                                        return (<div className="list__item" key={car_id}>
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
                                                            <button className="list__item__info__appt-details" type='button'
                                                                onClick={() => {
                                                                    setAppointmentInfo({
                                                                        car_request_datetime,
                                                                        car_title,
                                                                        car_description
                                                                    });
                                                                    setIsAppointmentDialogOpen(true)
                                                                }}
                                                            >
                                                                View Appointment Details
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="list__item__footer">
                                                        <div className="list__item__footer__status">
                                                            <p>Status: <span
                                                                style={{
                                                                    color: car_status === "approved" ? "#00b300" : ""
                                                                }}
                                                            >{car_status === "approved"?"in progress":"approved"}</span></p>
                                                        </div>
                                                        <div className="list__item__footer__actions">
                                                            <button style={{background: "blue"}}
                                                                onClick={()=>onCompletedClick(car_id, `${u_firstname}`)}
                                                            >Set as completed</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                        ) : (
                            <h3 className='no-apt-message'>You don't have any current appointments.</h3>
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

