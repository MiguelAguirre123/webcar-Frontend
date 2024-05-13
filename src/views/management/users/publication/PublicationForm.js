import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CButton
} from '@coreui/react'

const PublicationForm = () => {

    const [publicationData, setPublicationData] = useState({
        publicationContent: '',
        userId: ''
    });
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const getUsers = async () => {
            const response = await Axios({url:`http://localhost:1337/api/listuser`});
            const lstUsers = Object.keys(response.data).map(i=> response.data[i]);
            setUsers(lstUsers.flat());
        }

        getUsers();

    },[selectedUser]);

    function handleSelectUsers(event){
        setSelectedUser(event.target.value);
        setPublicationData({
            ...publicationData,
            userId: parseInt(event.target.value)
        })
    }

    function handleChange(event){
        const {name, value} = event.target;
        setPublicationData({
            ...publicationData,
            [name]: value
        });
    }

    function handleReturn(event){
        navigate('/users/publication');
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const response = await Axios.post('http://localhost:1337/api/createpublication', publicationData);
            console.log(response.data);
            navigate('/users/publication');
        }
        catch (e){
            console.log(e);
        }
    }

    return(
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
                <CFormInput 
                    type="text" 
                    id="userId" 
                    name="userId" 
                    label="User" 
                    value={publicationData.userId} 
                    onChange={handleChange} 
                />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="publicationContent" name="publicationContent" label="Description" value={publicationData.publicationContent} onChange={handleChange} />
            </CCol>
            <CCol xs={6}>
                <CButton color="primary" type="submit" >Save</CButton>
            </CCol>
            <CCol xs={6}>
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </CCol>
        </CForm>
    )
}

export default PublicationForm