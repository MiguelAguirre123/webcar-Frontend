import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importar useParams
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CButton
} from '@coreui/react';

const CarForm = () => {
    const { carId } = useParams(); // Obtener carId de los parámetros de la URL

    const [carData, setCarData] = useState({
        carName: '',
        carModel: '',
        carBrand: '',
        userId: ''
    });
    const [hasLoadedCar, setHasLoadedCar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getCar = async () => {
            try {
                const response = await Axios.get(`http://localhost:1337/api/getcar/${carId}`);
                const car = response.data.data;
                setCarData(car);
                setHasLoadedCar(true);
            } catch (error) {
                console.log(error);
            }
        };

        if (!hasLoadedCar) {
            getCar();
        }
    }, [carId, hasLoadedCar]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCarData({
            ...carData,
            [name]: value
        });
    }

    function handleReturn(event) {
        navigate('/users/car');
    }

    const handleSubmit = async (event) => {
        try {
            const response = await Axios.put(`http://localhost:1337/api/updatecar/${carId}`, carData);
            console.log(response.data);
            navigate('/users/car');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="carName"
                    name="carName"
                    label="Name"
                    value={carData.carName}
                    onChange={handleChange}
                />
            </CCol>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="carModel"
                    name="carModel"
                    label="Model"
                    value={carData.carModel}
                    onChange={handleChange}
                />
            </CCol>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="carBrand"
                    name="carBrand"
                    label="Brand"
                    value={carData.carBrand}
                    onChange={handleChange}
                />
            </CCol>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="userId"
                    name="userId"
                    label="User"
                    value={carData.userId}
                    onChange={handleChange}
                />
            </CCol>
            <CCol md={6}></CCol>
            <CCol md={1}>
                <CButton color="primary" type="submit">Save</CButton>
            </CCol>
            <CCol md={1}>
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </CCol>
        </CForm>
    );
};

export default CarForm;
