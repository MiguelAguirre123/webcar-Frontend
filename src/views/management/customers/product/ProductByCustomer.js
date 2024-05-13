import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useParams
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CButton
} from '@coreui/react';

const ProductByCustomer = () => {

    const [customerId, setCustomerId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setCustomerId(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //const response = await Axios.put(`http://localhost:1337/api/updatecar/${carId}`, carData);
            //console.log(response.data);
            navigate(`/customers/product/${customerId}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="customerId"
                    name="customerId"
                    label="Coloca la ID de un cliente para ver sus productos"
                    onChange={handleChange}
                />
            </CCol>
            <CCol md={6}></CCol>
            <CCol md={1}>
                <CButton color="primary" type="submit">Save</CButton>
            </CCol>
        </CForm>
    );
};

export default ProductByCustomer;