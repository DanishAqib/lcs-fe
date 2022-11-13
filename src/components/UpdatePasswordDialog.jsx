import React,{useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { srUpdatePassword } from '../service/srUser'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const UpdatePasswordDialog = ({
    setIsPasswordDialogOpen,
    user_id,
}) => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        const response = await srUpdatePassword(user_id, oldPassword, newPassword);
        if (response.status === "200") {
            toast.success(response.message);
            setIsPasswordDialogOpen(false);
        } else {
            toast.error(response.message);
        }
    }

    return (
        <div className='status-dialog'>
            <div className="status-dialog__header">
                <h3 className='content-title'>Update Password</h3>
            </div>
            <div className="status-dialog__body update-pass__body">
                <Form>
                    <Form.Group controlId="formBasicPassword" className='form-group fg-update-pass'>
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter current password" className="input update-pass-input"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicNewPassword" className='form-group fg-update-pass'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter new password" className="input update-pass-input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword" className='form-group fg-update-pass'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm new password" className="input update-pass-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </div>
            <div className="status-dialog__footer">
                <Button variant="primary" type="submit" className='update-pass-btn update-btn'
                    onClick={handleUpdatePassword}
                    disabled={oldPassword === '' || newPassword === '' || confirmPassword === ''}
                    style={{ backgroundColor: oldPassword === '' || newPassword === '' || confirmPassword === '' ? '#e0e0e0' : '#007bff',
                    pointerEvents: oldPassword === '' || newPassword === '' || confirmPassword === '' ? 'none' : 'auto'
                }}
                >
                    Update
                </Button>
                <Button variant="secondary" type="button" className='update-pass-btn'
                    onClick={() => setIsPasswordDialogOpen(false)}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}