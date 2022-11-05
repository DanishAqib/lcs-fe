import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Navbar } from '../../components/Navbar'
import { sendMessage } from '../../service/srUser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./contactUsPage.css"

export const ContactUsPage = () => {
    const [contactInfo, setContactInfo] = useState({
        um_name: "",
        um_email: "",
        um_message: "",
    });

    const onInputChange = (e) => {
        setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
    };

    const onFormSubmit = (res) => {
        if (res.status === "400") {
            toast.error(res.message,{
                position: toast.POSITION.TOP_CENTER
            });
        }
        else if (res.status === "200") {
            toast.success(res.message,{
                position: toast.POSITION.TOP_CENTER
            });
        }
        else {
            toast.error("Something went wrong",{
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    return (
    <>
        <div className='page-container'>
            <Navbar />
            <div className='contact-us-page-content'>
                <div className="contact-us-page__header">
                    <h2 className='content-title'>Get In Touch With Us</h2>
                    <p>For any queries or suggestions, please fill the form below and we will get back to you as soon as possible.</p>
                </div>
                <div className='contact-us-body'>
                    <Form className='form'
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage(contactInfo).then((res) => {
                                onFormSubmit(res);
                            });
                        }}
                    >
                        <Form.Group controlId="formBasicName" className='form-group'>
                            <Form.Control type="text" placeholder="Enter Name" className='input' name="um_name"
                                value={contactInfo.um_name}
                                onChange={onInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className='form-group' >
                            <Form.Control type="email" placeholder="Enter Email" className='input' name="um_email"
                                value={contactInfo.um_email}
                                onChange={onInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicMessage" className='form-group'>
                            <Form.Control as="textarea" placeholder="Enter Message..." className='input form-msg__body' name="um_message"
                                value={contactInfo.um_message}
                                onChange={onInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='button send-msg-btn'>
                            Send Message
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
        <ToastContainer />
    </>
  )
}
