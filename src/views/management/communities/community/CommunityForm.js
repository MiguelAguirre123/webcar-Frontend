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

const CommunityForm = () => {

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
            const response = await Axios({ url: `http://localhost:1332/api/getCommunity/${communityId}` })
            const community = response.data.data
            setCommunityData(community);
            setHasLoadedCommunity(true);
        }
        getCommunity();

        if (!hasLoadedCommunity) {
            getCommunity();
        }

    }, [/*selectedDepartment, restaurantId, hasLoadedRestaurant*/]);

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
            const response = await Axios.post('http://localhost:1337/api/createCommunity', communityData);
            console.log(response.data);
            navigate('/communities/community');
        }
        catch (e) {
            console.log(e);
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

export default CommunityForm