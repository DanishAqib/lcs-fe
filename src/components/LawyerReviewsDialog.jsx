import React, {useState, useEffect} from 'react'
import starIcon from '../assets/icons/star-icon.png';


export const LawyerReviewsDialog = ({
    setOpenReviewsDialog,
    reviews,
}) => {

  return (
    <div className="status-dialog review-dialog">
        <div className="status-dialog__body rd-body">
            <div className="status-dialog__header rd-head">
                <h2>Client Reviews</h2>
            </div>
            <div className="review-dialog__content">
                {
                    reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div className="status-dialog__content__body__review" key={review.cr_id}>
                            <h3>Reviewer: <span>{review.u_firstname} {review.u_lastname}</span></h3>
                            <div className='client-rating-given'>
                                <p>Rating: </p>
                                <span>
                                    {
                                        [...Array(review.cr_rating)].map((e, i) => (
                                            <img src={starIcon} alt="star-icon" className='client-rating-given-icon' key={i} />
                                        ))
                                    }
                                </span>
                            </div>
                            <p>Review: <span>{review.cr_review}</span></p>
                        </div>
                    ))
                    ) : (
                        <div className="status-dialog__content__body__review">
                            <h3>No reviews yet</h3>
                        </div>
                    )
                }
            </div>
            <div className="status-dialog__content__footer">
                <button variant="primary" type="submit" className="button dialog-cancel-btn"
                    onClick={() => setOpenReviewsDialog(false)}
                >
                    Close
                </button>
            </div>
        </div>
    </div>
  )
};