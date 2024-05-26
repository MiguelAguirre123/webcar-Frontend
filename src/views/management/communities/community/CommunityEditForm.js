import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CButton
} from '@coreui/react'

const CommunityEditForm = () => {
    const { communityId } = useParams();
    const [communityData, setCommunityData] = useState({
        communityName: '',
        communityCreator: '',
        communityDescription: '',
    });

    const [hasLoadedCommunity, setHasLoadedCommunity] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getCommunity = async () => {
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

                // Enviar la solicitud GET al servidor para obtener la comunidad
                const response = await Axios.get(`http://localhost:1337/api/getCommunity/${communityId}`, config);

                // Verificar si la respuesta es exitosa
                if (response.status === 200) {
                    const community = response.data.data;
                    setCommunityData(community);
                    setHasLoadedCommunity(true);
                } else {
                    console.log("Error fetching community:", response.statusText);
                }
            } catch (error) {
                console.log("Error:", error.message);
                navigate('/login');
            }
        };

        if (!hasLoadedCommunity) {
            getCommunity();
        }

    }, [communityId, hasLoadedCommunity, navigate]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCommunityData({
            ...communityData,
            [name]: value
        });
    }

    function handleReturn(event) {
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

            // Enviar la solicitud PUT al servidor para actualizar la comunidad
            const response = await Axios.put(`http://localhost:1337/api/updateCommunity/${communityId}`, communityData, config);

            // Verificar si la respuesta es exitosa
            if (response.status === 200) {
                console.log("Community updated successfully");
                navigate('/communities/community');
            } else {
                console.log("Error updating community:", response.statusText);
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

export default CommunityEditForm;
