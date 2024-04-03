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
export default function BasicModal({ modalOpen, setModalOpen }) {
    const dispatch = useDispatch()
    const state = useSelector((state) => state?.memberDataReducer);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleClose = () => setModalOpen(false);
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
            }
        };
        reader.readAsDataURL(selectedImage);
    };

    const addStudent = () => {
        setIsLoading(true);
        let formData = {
            name: name,
            email: email,
            avator: image,
        };
        axios.post('http://localhost:4000/api/post/add-new-members', formData)
            .then((res) => {
                const { data } = res;
                console.log('data',data)
                if (data?.success) {
                    dispatch(memberData([...state.data, data?.response]));
                    setModalOpen(false);
                    setName('');
                    setEmail('')
                    setImage('')
                    setIsLoading(false);
                    message.success(data?.message)
                }else{
                    message.error(data?.message)
                    setModalOpen(false);
                    setEmail('')
                    setName('');
                    setImage('')
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.log('err', err);
                setIsLoading(false);
            });
    };

    return (
        <div>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='close_icon'>
                        <CloseIcon onClick={handleClose} />
                    </div>
                    <h1 className='modal_heading'>Add New Member</h1>
                    <div className="input_div">
                        <input required type="text" className="input" placeholder='Name'
                            value={name} onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <input required type="email" className="input email_input" placeholder='Email'
                            value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <label htmlFor="fileInput" className="custom-file-upload">
                            {image ? 'Change Photo' : 'Upload Photo'}
                        </label>
                        <input id="fileInput" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
                        {image && (
                            <div>
                                <img src={image} alt="Uploaded" className='uploaded_img' />
                            </div>
                        )}
                        <button className='login_button' onClick={addStudent}>
                            {isLoading ? <Spin indicator={antIcon} /> : 'Add Member'}
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}