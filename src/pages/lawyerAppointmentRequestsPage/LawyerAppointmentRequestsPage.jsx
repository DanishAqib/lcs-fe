import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar';
import { formatDateAndTime, getCurrentUserSession } from '../../shared/utils';
import { srGetAllLawyerAppointmentRequests, changeAppointmentStatus, srUpdateAppointment } from '../../service/srAppointment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./lawyerAppointmentRequestsPage.css";
import AppointmentDetailsDialog from '../../components/AppointmentDetailsDialog';

export const LawyerAppointmentRequestsPage = () => {

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
    const [updatedAppointmentInfo, setUpdatedAppointmentInfo] = useState({
        selectedAppointmentId: '',
        selectedAppointmentClientName: '',
        selectedAppointmentDate: '',
    })

    const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
    const [isDateTimeDialogOpen, setIsDateTimeDialogOpen] = useState(false);
    const [isNewDateTimeSelected, setIsNewDateTimeSelected] = useState(false);

    useEffect(() => {
        srGetAllLawyerAppointmentRequests(currentUser.u_id).then((res) => {
            if (res.status === "200") {
                setAppointments(res.appointments.filter((appointment) => appointment.car_status === 'pending'));
            }
        })
    }, [currentUser.u_id]);

    const rejectAppointment = (appointmentId, clientName) => {
        changeAppointmentStatus(appointmentId, 'rejected').then((res) => {
            if (res.status === "200") {
                toast.error(`Appointment with ${clientName} has been rejected.`);
                setAppointments(appointments.filter((appointment) => appointment.car_id !== appointmentId));
            } else {
                toast.error(res.message);
            }
        })
    }

    const approveAppointment = (appointmentId, clientName) => {
        changeAppointmentStatus(appointmentId, 'approved').then((res) => {
            if (res.status === "200") {
                toast.success(`Appointment with ${clientName} has been approved.`);
                setAppointments(appointments.filter((appointment) => appointment.car_id !== appointmentId));
            } else {
                toast.error(res.message);
            }
        })
    }

    const updateAndApproveAppointment = () => {
        srUpdateAppointment(updatedAppointmentInfo).then((res) => {
            if (res.status === "200") {
                toast.success(`Appointment with ${updatedAppointmentInfo.selectedAppointmentClientName} has been updated and approved.`);
                setAppointments(appointments.filter((appointment) => appointment.car_id !== updatedAppointmentInfo.selectedAppointmentId));
            } else {
                toast.error(res.message);
            }
        });
    }


  return (
    <>
        <div className="page-container"
            style={{ pointerEvents: isAppointmentDialogOpen || isDateTimeDialogOpen ? 'none' : 'all',
            filter: isAppointmentDialogOpen || isDateTimeDialogOpen ? 'blur(4px)' : 'none',
            opacity: isAppointmentDialogOpen || isDateTimeDialogOpen ? '0.4' : '1'
          }}
        >
            <Navbar />
            <div className="lawyer-appointment-requests-page-content">
                <div className="lawyer-appointment-requests-page__header">
                    <h2 className='content-title'>Appointment Requests</h2>
                    <p>Following are the details of all the appointment requests from the clients. You can accept or reject the requests.</p>
                </div>
                <div className="lawyer-appointment-requests-page__body">
                    {
                        appointments.length > 0 ? (
                            <div className='list'>
                                {
                                    appointments.map((appointment) => {
                                        const {car_id, car_title, car_description, car_request_datetime, client} = appointment;
                                        const {u_firstname, u_lastname, u_city, clientImage} = client;

                                        return <div className='list__item' key={car_id}>
                                                    <div className='list__item__header'>
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
                                                                        car_description,
                                                                    });
                                                                    setIsAppointmentDialogOpen(true)
                                                                }}
                                                            >
                                                                View Appointment Details
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="l-apt-req-footer">
                                                        <div className='apt-req-footer__datetime'>
                                                            <p>DateTime: <span>{formatDateAndTime(car_request_datetime)}</span></p>
                                                            <button className='change__datetime-btn' type='button'
                                                                onClick={() => {
                                                                    setAppointmentInfo({
                                                                        car_request_datetime,
                                                                        car_title,
                                                                        car_description,
                                                                    });
                                                                    setUpdatedAppointmentInfo({
                                                                        ...updatedAppointmentInfo,
                                                                        selectedAppointmentId: car_id,
                                                                        selectedAppointmentClientName: `${u_firstname} ${u_lastname}`,
                                                                    })
                                                                    setIsDateTimeDialogOpen(true)
                                                                }}
                                                            >Change Datetime</button>
                                                        </div>
                                                        <div className='apt-req__action-btns'>
                                                            <button className="list__item__footer__accept"
                                                                onClick={() => approveAppointment(car_id, `${u_firstname}`)}
                                                            >
                                                                Accept
                                                            </button>
                                                            <button className="list__item__footer__reject"
                                                                onClick={() => rejectAppointment(car_id, `${u_firstname}`)}
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    )
                                }
                            </div>
                        ) : (
                            <h3 className='no-apt-message'>You don't have any appointment requests.</h3>
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
        {
            isDateTimeDialogOpen && (
                <div className="status-dialog datetime-dialog">
                    <div className="status-dialog__header datetime-dialog__header">
                        <h3>Update Appointment Datetime</h3>
                    </div>
                    <div className="datetime-dialog__body">
                        <div className="datetime-dialog__body__datetime">
                            <p>Current Datetime: <span>{formatDateAndTime(appointmentInfo.car_request_datetime)}</span></p>
                        </div>
                        <div className="datetime-dialog__body__input">
                            <label htmlFor="datetime">New Datetime: </label>
                            <input className='input' type="datetime-local" id="datetime" 
                                value={updatedAppointmentInfo.newDateTime}
                                onChange={(e) => {
                                    setUpdatedAppointmentInfo({
                                        ...updatedAppointmentInfo,
                                        selectedAppointmentDate: e.target.value
                                    });
                                    setIsNewDateTimeSelected(true);
                                }}
                            />
                        </div>
                    </div>
                    <div className="status-dialog__footer datetime-dialog__footer">
                        <button className="datetime-dialog__footer__update" type='button'
                            style={{
                                pointerEvents: isNewDateTimeSelected ? 'auto' : 'none',
                                backgroundColor: isNewDateTimeSelected ? '#1e90ff' : '#1e90ff80'
                            }}
                            onClick={() => {
                                updateAndApproveAppointment();
                            }}
                        >Update & Accept</button>
                        <button className="dialog-cancel-btn datetime-dialog__footer__cancel" type='button'
                            onClick={() => {
                                setIsDateTimeDialogOpen(false)
                                setUpdatedAppointmentInfo({
                                    ...updatedAppointmentInfo,
                                    selectedAppointmentDate: ''
                                });
                                setIsNewDateTimeSelected(false)
                            }}
                        >Cancel</button>
                    </div>
                </div>
            )
        }
        <ToastContainer />
    </>
  )
};