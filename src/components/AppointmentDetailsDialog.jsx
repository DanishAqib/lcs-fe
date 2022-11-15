import React from 'react'
import { formatDateAndTime } from '../shared/utils';

const AppointmentDetailsDialog = ({
    appointmentInfo,
    setIsAppointmentDialogOpen,
    status,
}) => {
  return (
    <div className="status-dialog apt-details-dialog">
        <div className="status-dialog__header">
            <h3>Appointment Details</h3>
        </div>
        <div className="appointment-details-dialog__body">
            <h3>{status ? "Completion" : "Requested"} DateTime: <span>{formatDateAndTime(appointmentInfo.car_request_datetime)}</span></h3>
            <h3>Title: <span>{appointmentInfo.car_title}</span></h3>
            <h3 className='apt-description  '>Description: <span>{appointmentInfo.car_description}</span></h3>
        </div>
        <div className="appointment-details-dialog__footer">
            <button className="apt-details-dialog-btn button" onClick={() => setIsAppointmentDialogOpen(false)}>Close</button>
        </div>
    </div>
  )
};

export default AppointmentDetailsDialog