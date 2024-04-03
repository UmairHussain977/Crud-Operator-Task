import React, { useState, useEffect } from "react";
import { BasicModal, Header } from "../../Components";
import { Table } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { memberData } from "../../Redux/Action/Action";
import swal from "sweetalert";
import EditModal from "../../Components/Modal/EditModal";
const Home = () => {
    const state = useSelector((state) => state?.memberDataReducer);
    const dispatch = useDispatch();
    const [students, setStudents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avator, setAvator] = useState()
    const [id, setId] = useState()

    const handleEditClick = (record) => {
        setName(record?.name)
        setEmail(record?.email)
        setAvator(record?.avator)
        setOpen(true)
        setId(record?._id)
        setSelectedStudent(record);
    };
    const columns = [
        {
            title: "ID",
            render: (text, record, index) => {
                const paddedIndex = String(index + 1).padStart(2, '0');
                return paddedIndex;
            },
            width: "5%",
        },
        {
            title: "Image",
            dataIndex: "avator",
            key: "avator",
            render: (value) => (
                <img className="profile_img" src={value} />
            ),
            width: "15%",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value) => (
                <p>{value}</p>
            ),
            width: "15%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (value) => (
                <p>{value}</p>
            ),
            width: "15%",
        },
        {
            title: "Action",
            dataIndex: "_id",
            key: "_id",
            render: (value, record) => (
                <>
                    <button className="action_btn edit" onClick={() => handleEditClick(record)}>Edit</button>
                    <button className="action_btn" onClick={() => deleteStudent(value)}>Delete</button>
                </>
            ),
            width: "15%",
        },
    ];
    useEffect(() => {
        getAllStudent();
    }, []);

    useEffect(() => {
        setStudents(state?.data || []);
    }, [state]);


    const deleteStudent = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this member!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post('http://localhost:4000/api/post/delete-member', { _id: id })
                        .then((res) => {
                            const { data } = res;
                            if (data?.success) {
                                const updatedStudents = state.data.filter(student => student._id !== id);
                                dispatch(memberData(updatedStudents));
                                swal("Deleted!", "The member has been deleted.", "success");
                            } else {
                                swal("Error", "Failed to delete the member.", "error");
                            }
                        })
                        .catch((err) => {
                            console.log('err', err);
                            swal("Error", "Failed to delete the member.", "error");
                        });
                } else {
                    swal("Cancelled", "Your member is safe!", "info");
                }
            });
    }


    const getAllStudent = () => {
        axios.get('http://localhost:4000/api/get/all-members')
            .then((res) => {
                const { data } = res
                if (data) {
                    dispatch(memberData(data?.response))
                }
            })
            .catch((e) => {
                console.log('err', e)
            })
    }
    const handleOpen = () => setModalOpen(true);
    return (
        <div>
            <Header/>
            <div className="add_btn_div">
                <button onClick={handleOpen}> Add New Member</button>
            </div>
            <div className="table_div">
                <Table
                    columns={columns}
                    dataSource={students}
                    pagination={{ hideOnSinglePage: true }}
                    scroll={{ x: true }}
                />
            </div>
            <BasicModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
            <EditModal open={open} setOpen={setOpen} selectedStudent={selectedStudent} name={name} email={email} avator={avator} id={id} setName={setName} setAvator={setAvator} setEmail={setEmail} setId={setId}/>
        </div>
    )
}

export default Home