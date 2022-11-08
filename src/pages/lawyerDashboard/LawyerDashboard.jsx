import React, {useState} from 'react'
import { Navbar } from "../../components/Navbar";
import { getCurrentUserSession } from '../../shared/utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./lawyerDashboard.css";
import { StatusChangeDialog } from '../../components/StatusChangeDialog';

export const LawyerDashboard = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUserSession();
  if (!currentUser) {
    window.location.href = "/login";
  }

  const [openStatusChangeDialog, setOpenStatusChangeDialog] = useState(false);

  return (
    <>
      <div className="page-container"
        style={{ pointerEvents: openStatusChangeDialog ? 'none' : 'auto',
          filter: openStatusChangeDialog ? 'blur(4px)' : 'none',
          opacity: openStatusChangeDialog ? '0.4' : '1'
        }}
      >
        <Navbar />
        <div className="dashboard-content">
          <h1 className="content-title dashboard__header lawyer-dashboard-header">
            Welcome <span>{currentUser.u_firstname}</span> !
          </h1>
          <p className='user-status'>Your current status is: <span
            style={{ color: currentUser.li_status === "available" ? "green" : "red" }}
          >{currentUser.li_status}</span></p>
          <div className="dashboard__content-body">
            <div className='dashboard__content__card'>
              <h3 className='dashboard__content__card__header'>Appointment Requests</h3>
              <p className='dashboard__content__card__body'>
                Click here to check all the appointment requests from the clients and accept or reject them.
              </p>
              <button className='button dashboard__content__card__button'>View Appointment Requests</button>
            </div>
            <div className='dashboard__content__card'>
              <h3 className='dashboard__content__card__header'>Current Appointments</h3>
              <p className='dashboard__content__card__body'>
                Click here to check all the current appointments with the clients along with the appointment details.
              </p>
              <button className='button dashboard__content__card__button'>View Current Appointment</button>
            </div>
            <div className='dashboard__content__card'>
              <h3 className='dashboard__content__card__header'>Appointments History</h3>
              <p className='dashboard__content__card__body'>
                Click here to check all the appointments history with the clients along with the appointment details.
              </p>
              <button className='button dashboard__content__card__button'>View Appointments History</button>
            </div>
            <div className='dashboard__content__card'>
              <h3 className='dashboard__content__card__header'>Change Status</h3>
              <p className='dashboard__content__card__body'>
                Click here to change your status to available or unavailable to let the clients know about your availability.
              </p>
              <button className='button dashboard__content__card__button'
                onClick={() => setOpenStatusChangeDialog(true)}
              >Change Status</button>
            </div>
            <div className='dashboard__content__card'>
              <h3 className='dashboard__content__card__header'>Update Profile</h3>
              <p className='dashboard__content__card__body'>
                Click here to update your profile details. You can also update your profile picture here.
              </p>
              <button className='button dashboard__content__card__button'
                onClick={() => navigate('/update-profile')}
              >Update Profile</button>
            </div>
            <div className='dashboard__content__card'>
              <h3 className='dashboard__content__card__header'>Contact Us</h3>
              <p className='dashboard__content__card__body'>
                If you have any queries or suggestions, click here to contact contact us and we will get back to you soon.
              </p>
              <button className='button dashboard__content__card__button'
                onClick={() => navigate('/contact-us')}
              >Contact Us</button>
            </div>
          </div>
        </div>
      </div>
      {openStatusChangeDialog && (
        <StatusChangeDialog 
          setOpenStatusChangeDialog={setOpenStatusChangeDialog}
          u_id={currentUser.u_id}
        />
      )}
      <ToastContainer />
    </>
  )
}