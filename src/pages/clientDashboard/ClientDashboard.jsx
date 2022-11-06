import React from 'react'
import { Navbar } from '../../components/Navbar'
import { getCurrentUserSession } from '../../shared/utils';

export const ClientDashboard = () => {
  const currentUser = getCurrentUserSession();
  if (!currentUser) {
    window.location.href = "/login";
  }

  return (
    <>
      <div className="client-dashboard">
        <Navbar />
        <div className="dashboard-content">
          <h1 className="content-title dashboard__header">
            Welcome <span>{currentUser.u_firstname}</span> !
          </h1>
          <div className="dashboard__content-body">
            <div className='dashboard__content__card'>
              <h3 className='dashboard__content__card__header'>Make an appointment</h3>
              <p className='dashboard__content__card__body'>
                Click here to make an appointment with a lawyer to consult about your legal issues and get the best legal advice.
              </p>
              <button className='button dashboard__content__card__button'>Make an appointment</button>
            </div>
            <div className='dashboard__content__card'>
              <h3 className='dashboard__content__card__header'>Current Appointment</h3>
              <p className='dashboard__content__card__body'>
                Click here to check all the current appointments with the lawyers along with the appointment details.
              </p>
              <button className='button dashboard__content__card__button'>View Current Appointment</button>
            </div>
            <div className='dashboard__content__card'>
              <h3 className='dashboard__content__card__header'>Appointments History</h3>
              <p className='dashboard__content__card__body'>
                Click here to check all the appointments history with the lawyers along with the appointment details.
              </p>
              <button className='button dashboard__content__card__button'>View Appointments History</button>
            </div>
            <div className='dashboard__content__card'>
              <h3 className='dashboard__content__card__header'>List of Lawyers</h3>
              <p className='dashboard__content__card__body'>
                Click here to check all the lawyers registered with us along with their profile details.
              </p>
              <button className='button dashboard__content__card__button'>View List of Lawyers</button>
            </div>
            <div className='dashboard__content__card'>
              <h3 className='dashboard__content__card__header'>Update Profile</h3>
              <p className='dashboard__content__card__body'>
                Click here to update your profile details. You can also add your profile picture here.
              </p>
              <button className='button dashboard__content__card__button'>Update Profile</button>
            </div>
            <div className='dashboard__content__card'>
              <h3 className='dashboard__content__card__header'>Contact Us</h3>
              <p className='dashboard__content__card__body'>
                If you have any queries or suggestions, click here to contact contact us and we will get back to you soon.
              </p>
              <button className='button dashboard__content__card__button'>Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
