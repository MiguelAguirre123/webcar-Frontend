import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CButton
} from '@coreui/react'

const UserEditForm = () => {

    const {userId} = useParams();
    
    const [userData, setUserData] = useState({
        userName: '',
        userPhone: '',
        userNickName:'',
        userAddress: '',
        userEmail: ''
    });
    const [hasLoadedUser, setHasLoadedUser] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        
        const getUser = async() => {
            const response = await Axios({url: `http://localhost:1337/api/getuser/${userId}`})
            const user = response.data.data
            setUserData(user);
            setHasLoadedUser(true)
        }

        if(!hasLoadedUser){
            getUser();
        }
        
    },[ userId, hasLoadedUser]);


    function handleChange(event){
        const {name, value} = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    function handleReturn(event){
        navigate('/users/user');
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const response = await Axios.put(`http://localhost:1337/api/updateuser/${userId}`, userData);
            console.log(response.data);
            navigate('/users/user');
        }
        catch (e){
            console.log(e);
        }
    }

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
                <CFormInput 
                    type="text" 
                    id="userName" 
                    name="userName" 
                    label="Name" 
                    value={userData.userName} 
                    onChange={handleChange} 
                />
            </CCol>
            <CCol md={6}>
                <CFormInput 
                    type="text" 
                    id="userPhone" 
                    name="userPhone" 
                    label="Phone" 
                    value={userData.userPhone} 
                    onChange={handleChange} 
                />
            </CCol>
            <CCol md={6}>
                <CFormInput 
                    type="text" 
                    id="userNickName" 
                    name="userNickName" 
                    label="NickName" 
                    value={userData.userNickName} 
                    onChange={handleChange} 
                />
            </CCol>
            <CCol md={6}>
                <CFormInput 
                    type="text" 
                    id="userAddress" 
                    name="userAddress" 
                    label="Address" 
                    value={userData.userAddress} 
                    onChange={handleChange} 
                />
            </CCol>
            <CCol md={6}>
                <CFormInput 
                    type="email" 
                    id="userEmail" 
                    name="userEmail" 
                    label="Email" 
                    value={userData.userEmail} 
                    onChange={handleChange} 
                />
            </CCol>
            <CCol md={6}></CCol>
            <CCol md={1}>
                <CButton color="primary" type="submit"> Save </CButton>
            </CCol>
            <CCol md={1}>
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </CCol>
        </CForm>
    );
}

export default UserEditForm