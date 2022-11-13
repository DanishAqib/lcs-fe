import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { srGiveLawyerReview } from '../service/srLawyer';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form'


export const GiveReviewDialog = ({
    setIsRatingDialogOpen,
    lawyer_id,
    currentUser,
    appointment_id
}) => {

    const [ratingsInfo, setRatingsInfo] = useState({
        rating: 0,
        comment: '',
    });

    const onRatingChange = (newRating) => {
        setRatingsInfo({
            ...ratingsInfo,
            rating: newRating,
        });
    };

    const onCommentChange = (e) => {
        setRatingsInfo({
            ...ratingsInfo,
            comment: e.target.value,
        });
    };

    return (
        <div className='status-dialog ratings__dialog'>
            <div className='status-dialog__header ratings__dialog__header'>
                <h3>Submit a Review</h3>
            </div>
            <div className='status-dialog__body'>
                <Form>
                    <Form.Group controlId='formBasicRating' className='form-group'>
                        <ReactStars count={5} size={35} activeColor="#ffd700" 
                            onChange={onRatingChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='formBasicReview' className='form-group'>
                        <Form.Control as="textarea" placeholder="Enter Review..." className='input review__msg__input' name="um_message" 
                            onChange={onCommentChange}
                        />
                    </Form.Group>
                </Form>
            </div>
            <div className='status-dialog__footer'>
                <button 
                    style={{
                        pointerEvents: ratingsInfo.rating === 0 && ratingsInfo.comment === '' ? 'none' : 'auto',
                        backgroundColor: ratingsInfo.rating === 0 && ratingsInfo.comment === '' ? '#1e90ff80' : '#1e90ff'
                    }}
                    onClick={() => {
                        srGiveLawyerReview(appointment_id, lawyer_id, currentUser.u_id, ratingsInfo.rating, ratingsInfo.comment).then((res) => {
                            if (res.status === "200") {
                                setIsRatingDialogOpen(false);
                                toast.success(res.message, {
                                    position: toast.POSITION.TOP_CENTER,
                                });
                            }
                        })
                    }}
                >Submit</button>
                <button className='dialog-cancel-btn'
                    onClick={()=>{
                        setIsRatingDialogOpen(false)
                        setRatingsInfo({
                            rating: 0,
                            comment: '',
                        });
                    }}
                >Cancel</button>
            </div>
        </div>
    )
}