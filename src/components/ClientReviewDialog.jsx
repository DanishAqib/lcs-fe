import React from 'react'
import ReactStars from "react-rating-stars-component";


export const ClientReviewDialog = ({
    setIsClientReviewDialogOpen,
    clientReview,
}) => {
    return (
        <div className="status-dialog cr_dialog">
            <div className="status-dialog__header">
                <h3>Client Review</h3>
            </div>
            <div className="status-dialog__body cr_body">
                <div className="review-dialog__content cr__content">
                    <div className="status-dialog__content__body__review">
                        <h3>Reviewer: <span>{clientReview.u_firstname} {clientReview.u_lastname}</span></h3>
                        <div className='client-rating-given'>
                            <p>Rating: </p><span>
                                <ReactStars 
                                    count={5}
                                    value={clientReview.cr_rating}
                                    size={18}
                                    activeColor="#ffd700"
                                    edit={false}
                                />
                            </span>
                        </div>
                        <p className='cr__description'>Review: <span>{clientReview.cr_review}</span></p>
                    </div>
                </div>
            </div>
            <div className="status-dialog__footer">
                <button className="status-dialog__footer__btn"
                    onClick={() => {setIsClientReviewDialogOpen(false)}}
                >
                    Close
                </button>
            </div>
        </div>
    )
}