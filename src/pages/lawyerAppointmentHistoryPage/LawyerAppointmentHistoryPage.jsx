import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar';
import { getCurrentUserSession } from '../../shared/utils';
import AppointmentDetailsDialog from '../../components/AppointmentDetailsDialog';
import "./lawyerAppointmentHistoryPage.css";
import DefaultProfile from '../../assets/images/default-profile.png';

export const LawyerAppointmentHistoryPage = () => {
    return (
        <>
            <div className="page-container">
                <Navbar />
                <div className="current-appointment-page-content">
                    <div className="current-appointment-page__header">
                        <h2 className="content-title">Appointments History</h2>
                        <p>Following is the list of all your previous completed appointments with the clients.</p>
                    </div>
                    <div className="current-appointment-page__body">
                        <div className="list">
                            <div className="list__item">
                                <div className="list__item__header">
                                    <div className="list__item__image">
                                        <img src={DefaultProfile} alt="profile" />
                                    </div>
                                    <div className="list__item__info l-apt-req"
                                        style={{gap: '2rem'}}
                                    >
                                        <div>
                                            <h3>Client Name</h3>
                                            <p>Client City</p>
                                        </div>
                                        <button className="list__item__info__appt-details">
                                            View Appointment Details
                                        </button>
                                    </div>
                                </div>
                                <div className="list__item__footer">
                                    <div className="list__item__footer__status">
                                        <p>Status: <span></span></p>
                                    </div>
                                    <div className="list__item__footer__actions history__page__actions">
                                        <button className="list__item__footer__actions__btn">
                                            Give Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}