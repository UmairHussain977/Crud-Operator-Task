import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import { memberData } from "../../Redux/Action/Action";
import CloseIcon from '@mui/icons-material/Close';
import { message } from 'antd'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: 3
};
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 20,
            marginRight: 10,
            color: 'white'
        }}
        spin
    />
)
export default function EditModal({ open, setOpen, name, email, avator, setEmail, setAvator, setName, id }) {
    const dispatch = useDispatch()
    const state = useSelector((state) => state?.memberDataReducer);
    const [isLoading, setIsLoading] = useState(false)
    const handleClose = () => setOpen(false);

    const updateStudent = () => {
        setIsLoading(true);
        let formData = {
            name: name,
            email: email,
            avator: avator,
            _id: id
        };
        axios.post('http://localhost:4000/api/post/update-member', formData)
            .then((res) => {
                const { data } = res;
                if (data && data.success) {
                    const updatedStudent = data.response;
                    const updatedStudents = state.data.map(student => {
                        if (student._id === updatedStudent._id) {
                            return updatedStudent;
                        }
                        return student;
                    });
                    dispatch(memberData(updatedStudents));
                    setOpen(false);
                    setName('');
                    setAvator('');
                    setIsLoading(false);
                    message.success(data?.message)
                } else {
                    setIsLoading(false);
                    message.error(data?.message)
                }
            })
            .catch((err) => {
                console.log('Error:', err);
                setIsLoading(false);
            });
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvator(reader.result);
            }
        };
        reader.readAsDataURL(selectedImage);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='close_icon'>
                        <CloseIcon onClick={handleClose} />
                    </div>
                    <h1 className='modal_heading'>Update Member</h1>
                    <div className="input_div">
                        <input required type="text" className="input" placeholder='Name'
                            value={name} onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <input required type="text" className="input email_input" placeholder='Email'
                            value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <label htmlFor="fileInput" className="custom-file-upload">
                            Change Photo
                        </label>
                        <input id="fileInput" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
                        {avator && (
                            <div>
                                <img src={avator} alt="Uploaded" className='uploaded_img' />
                            </div>
                        )}
                        <button className='login_button' onClick={updateStudent}>
                            {isLoading ? <Spin indicator={antIcon} /> : 'Update Member'}
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}