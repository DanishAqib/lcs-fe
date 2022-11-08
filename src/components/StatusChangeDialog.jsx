import React, { useState } from 'react'
import { srChangeLawyerStatus } from '../service/srLawyer';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
export const StatusChangeDialog = ({
    setOpenStatusChangeDialog,
    u_id,
}) => {
    const [isStatusValueSelected, setIsStatusValueSelected] = useState(false);
    const [statusValue, setStatusValue] = useState();

    return (
        <div className="status-dialog">
            <div className="status-dialog__header">
                <h3 className='content-title'>Update Status</h3>
            </div>
            <div className="status-dialog__body">
                <p>Change your status to available or unavailable to let the clients know about your availability.</p>
                <div className="status-dialog__dropdown">
                    <select name='status' id='status'
                        defaultValue="select status"
                        onChange={(e) => {
                            setStatusValue(e.target.value);
                            setIsStatusValueSelected(true);
                        }}
                    >
                        <option disabled hidden value="select status"
                            >Select Status</option>
                        <option value="available">Available</option>
                        <option value="not available">Not Available</option>
                    </select>
                </div>
            </div>
            <div className="status-dialog__footer">
                <button
                    style={{
                        pointerEvents: isStatusValueSelected ? 'auto' : 'none',
                        backgroundColor: isStatusValueSelected ? '#1e90ff' : '#1e90ff80'
                    }}
                    onClick={() => {
                        if (statusValue) {
                            srChangeLawyerStatus(u_id, statusValue)
                                .then((res) => {
                                    if (res.status === "200") {
                                        toast.success(res.message);
                                        setOpenStatusChangeDialog(false);
                                        setIsStatusValueSelected(false);
                                        setStatusValue("");
                                        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
                                        userInfo.li_status = statusValue;
                                        localStorage.setItem('userInfo', JSON.stringify(userInfo));
                                    }
                                })
                                .catch((err) => {
                                    toast.error("Something went wrong");
                                }
                            )
                        }
                    }}
                >Update</button>
                <button className='dialog-cancel-btn'
                    onClick={() => {
                        setOpenStatusChangeDialog(false)
                        setIsStatusValueSelected(false);
                        setStatusValue("");
                    }}
                >Cancel</button>    
            </div>
        </div>
    )
}