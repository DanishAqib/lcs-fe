import React from 'react'
import ReactStars from "react-rating-stars-component";



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
                                        <ReactStars
                                            count={5}
                                            value={review.cr_rating}
                                            size={18}
                                            activeColor="#ffd700"
                                            edit={false}
                                        />
                                    }
                                </span>
                            </div>
                            <p className='cr__description'>Review: <span>{review.cr_review}</span></p>
                        </div>
                    ))
                    ) : (
                        <div className="status-dialog__content__body__review"
                            style={{marginTop: '4rem'}}
                        >
                            <h3 style={{textAlign: 'center'}}>No reviews yet</h3>
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