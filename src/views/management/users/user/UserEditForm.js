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
        userPassword: '',
        userAddress: '',
        userEmail: ''
    });
    const [hasLoadedUser, setHasLoadedUser] = useState(false);
    const [hashedPassword, setHashedPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        
        const getUser = async() => {
            try{
                // Obtener el token del localStorage
                const token = localStorage.getItem('token');

                // Verificar si hay un token almacenado
                if (!token) {
                    console.log("Token not found in localStorage");
                    navigate('/login');
                    return;
                }

                // Configurar los headers de la solicitud para incluir el token
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };
            const response = await Axios.get( `http://localhost:1337/api/getuser/${userId}`, config)

            if(response.status === 200){
                const user = response.data.data;
                setUserData({
                    ...user,
                    userPassword: ''
                });
                setHashedPassword(userData.userPassword)
                setHasLoadedUser(true)
            }else{
                console.log("Error fetching user:", response.statusText);
            }
            
        }catch(error){
            console.log("Error:", error.message);
                navigate('/login');
        }
    }

        if(!hasLoadedUser){
            getUser();
        }
        
    },[ userId, hasLoadedUser, hashedPassword]);


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
            // Obtener el token del localStorage
            const token = localStorage.getItem('token');

            // Verificar si hay un token almacenado
            if (!token) {
                console.log("Token not found in localStorage");
                navigate('/login');
                return;
            }

            // Configurar los headers de la solicitud para incluir el token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await Axios.put(`http://localhost:1337/api/updateuser/${userId}`, userData,config);

            // Verificar si la respuesta es exitosa
            if (response.status === 200) {
                console.log("car updated successfully");
                navigate('/users/user');
            } else {
                console.log("Error updating community:", response.statusText);
            }
            
        }
        catch (e){
            console.log("Error:", error.message);
            navigate('/login');
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
                    id="userPassword" 
                    name="userPassword" 
                    label="Password" 
                    value={userData.userPassword} 
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