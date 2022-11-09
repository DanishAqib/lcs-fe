import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar';
import { useNavigate } from "react-router-dom";
import { getCurrentUserSession } from '../../shared/utils';
import { srGetAllLawyers } from '../../service/srLawyer';
import "./makeAppointmentPage.css";


export const MakeAppointmentPage = () => {
    const currentUser = getCurrentUserSession();
    if (!currentUser) {
        window.location.href = "/login";
    }
    const navigate = useNavigate();

    const [lawyers, setLawyers] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    useEffect(() => {
        srGetAllLawyers().then((res) => {
            if (res.status === "200") {
                setLawyers(res.lawyers);
            }
        })
    }, []);

    return (
        <>
            <div className="page-container">
                <Navbar />
                <div className="make-appointment-page-content">
                    <div className="make-appointment-page__header">
                        <h2 className='content-title'>Make an appointment</h2>
                        <p>Following are the details of all the available lawyers. Please select the lawyer you want to consult with or search for a lawyer by name, city or service type.</p>
                    </div>
                    <div className="make-appointment-page__search">
                        <input className='input' type="text" placeholder="Search by name, city or service type" 
                            value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <div className="make-appointment-page__body">
                        {
                            lawyers.length > 0 ? (
                            lawyers.filter((lawyer) => {
                                if (searchValue === '') {
                                    return lawyer;
                                } else if (lawyer.u_firstname.toLowerCase().includes(searchValue.toLowerCase())
                                    || lawyer.u_lastname.toLowerCase().includes(searchValue.toLowerCase())
                                    || lawyer.u_city.toLowerCase().includes(searchValue.toLowerCase())
                                    || lawyer.li_services_name.toLowerCase().includes(searchValue.toLowerCase()) 
                                ) {
                                    return lawyer;
                                }
                                return null;
                            }).map((lawyer) => {
                                const {u_firstname, u_lastname, u_city, u_id, li_services_name, li_status, ui_image} = lawyer;
                                return (
                                    <div className="make-appointment-page__body__lawyers__card" key={u_id}>
                                        <div className="make-appointment-page__body__lawyers__card__image">
                                            <img src={ui_image} alt="lawyer-profile" />
                                        </div>
                                        <div className="make-appointment-page__body__lawyers__card__details">
                                            <h4 className="make-appointment-page__body__lawyers__card__details__name">Name: <span>{u_firstname} {u_lastname}</span></h4>
                                            <p className="make-appointment-page__body__lawyers__card__details__location">Location: <span>{u_city}</span></p>
                                            <p className="make-appointment-page__body__lawyers__card__details__services">Services: <span>{li_services_name}</span></p>
                                            <p className="make-appointment-page__body__lawyers__card__details__status">Status: <span
                                                style={{color: li_status === "available" ? "#0af55c" : "#f50a21"}}
                                            >{li_status}</span></p>
                                        </div>
                                        <div className="make-appointment-page__body__lawyers__card__button">
                                            <button className="button select-lawyer-btn"
                                                style={{pointerEvents: li_status === "available" ? "all" : "none", backgroundColor: li_status === "available" ? "" : "#bdc3c7",
                                                    cursor: li_status === "available" ? "pointer" : "not-allowed"
                                                }}
                                                onClick={() => {
                                                    navigate('/appointment-request', {state: {lawyerInfo: lawyer}});
                                                }}
                                            >{
                                                li_status === "available" ? "Select Lawyer" : "Unavailable"
                                            }</button>
                                        </div>
                                    </div>
                                )
                            })
                            ) : (
                                <h2 className='no-lawyer-title'>No Lawyers Found</h2>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
};

