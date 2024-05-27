import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CButton
} from '@coreui/react';

const CommunityForm = () => {
    const [communityData, setCommunityData] = useState({
        communityName: '',
        communityCreator: '',
        communityDescription: '',
    });

    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setCommunityData({
            ...communityData,
            [name]: value
        });
    }

    function handleReturn() {
        navigate('/communities/community');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
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

            // Enviar la solicitud POST al servidor para crear la comunidad
            const response = await Axios.post('http://localhost:1337/api/createCommunity', communityData, config);

            // Verificar si la respuesta es exitosa
            if (response.status === 200) {
                console.log("Community created successfully");
                navigate('/communities/community');
            } else {
                console.log("Error creating community:", response.statusText);
            }
        } catch (error) {
            console.log("Error:", error.message);
            navigate('/login');
        }
    }

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
                <CFormInput type="text" id="communityName" name="communityName" label="Name" value={communityData.communityName} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="communityCreator" name="communityCreator" label="Creator" value={communityData.communityCreator} onChange={handleChange} />
            </CCol>
            <CCol xs={12}>
                <CFormInput type="text" id="communityDescription" name="communityDescription" label="Description" value={communityData.communityDescription} onChange={handleChange} />
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

export default CommunityForm;
