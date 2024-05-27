import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CButton
} from '@coreui/react';

const CustomerForm = () => {

    const [customerData, setCustomerData] = useState({
        customerName: '',
        customerPhone: '',
        customerDescrip: '',
        customerAddress: '',
        customerEmail: ''
    });

    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setCustomerData({
            ...customerData,
            [name]: value
        });
    }

    function handleReturn() {
        navigate('/customers/customer');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Obtener el token del localStorage
            const token = localStorage.getItem('token'); 
    
           
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
    
            // Realizar la solicitud POST con los datos del cliente y la configuración de los headers
            const response = await Axios.post('http://localhost:1337/api/createCustomer', customerData, config);
            console.log(response.data);
            navigate('/customers/customer');
        } catch (e) {
            console.log(e);
            navigate('/login');
        }
    }

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
                <CFormInput 
                    type="text" 
                    id="customerName" 
                    name="customerName" 
                    label="Name" 
                    value={customerData.customerName} 
                    onChange={handleChange} 
                />
            </CCol>
            <CCol md={6}>
                <CFormInput 
                    type="text" 
                    id="customerPhone" 
                    name="customerPhone" 
                    label="Phone" 
                    value={customerData.customerPhone} 
                    onChange={handleChange} 
                />
            </CCol>
            <CCol xs={6}>
                <CFormInput 
                    type="text" 
                    id="customerDescrip" 
                    name="customerDescrip" 
                    label="Description" 
                    value={customerData.customerDescrip} 
                    onChange={handleChange} 
                />
            </CCol>
            <CCol xs={6}>
                <CFormInput 
                    type="text" 
                    id="customerAddress" 
                    name="customerAddress" 
                    label="Address" 
                    value={customerData.customerAddress} 
                    onChange={handleChange} 
                />
            </CCol>
            <CCol xs={6}>
                <CFormInput 
                    type="text" 
                    id="customerEmail" 
                    name="customerEmail" 
                    label="Email" 
                    value={customerData.customerEmail} 
                    onChange={handleChange} 
                />
            </CCol>
            <CCol xs={6}></CCol>
            <CCol xs={6}>
                <CButton color="primary" type="submit"> Save </CButton>
            </CCol>
            <CCol xs={6}>
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </CCol>
        </CForm>
    )
}

export default CustomerForm;