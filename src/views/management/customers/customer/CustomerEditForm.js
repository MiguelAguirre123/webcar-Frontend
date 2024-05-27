import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CButton
} from '@coreui/react';

const CustomerEditForm = () => {
    const { customerId } = useParams();
    const [customerData, setCustomerData] = useState({
        customerName: '',
        customerPhone:'',
        customerDescrip: '',
        customerAddress:'',
        customerEmail:''
    });
    const [hasLoadedCustomer, setHasLoadedCustomer] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getCustomer = async () => {
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

                // Enviar la solicitud GET al servidor para obtener el cliente
                const response = await Axios.get(`http://localhost:1337/api/getcustomer/${customerId}`, config);

              
                if (response.status === 200) {
                    const customer = response.data.data;
                    setCustomerData(customer);
                    setHasLoadedCustomer(true);
                } else {
                    console.log("Error fetching customer:", response.statusText);
                }
            } catch (error) {
                console.log("Error:", error.message);
                navigate('/login');
            }
        };

        if (!hasLoadedCustomer) {
            getCustomer();
        }
    }, [customerId, hasLoadedCustomer, navigate]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCustomerData({
            ...customerData,
            [name]: value
        });
    }

    function handleReturn(event) {
        navigate('/customers/customer');
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

            // Enviar la solicitud PUT al servidor para actualizar el cliente
            const response = await Axios.put(`http://localhost:1337/api/updateCustomer/${customerId}`, customerData, config);

            // Verificar si la respuesta es exitosa
            if (response.status === 200) {
                console.log(response.data);
                navigate('/customers/customer');
            } else {
                console.log("Error updating customer:", response.statusText);
            }
        } catch (error) {
            console.log("Error:", error.message);
            navigate('/login');
        }
    };

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
                <CFormInput type="text" id="customerName" name="customerName" label="Name" value={customerData.customerName} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
                <CFormInput type="text" id="customerPhone" name="customerPhone" label="Phone" value={customerData.customerPhone} onChange={handleChange} />
            </CCol>
            <CCol xs={6}>
                <CFormInput type="text" id="customerDescrip" name="customerDescrip" label="Description" value={customerData.customerDescrip} onChange={handleChange} />
            </CCol>
            <CCol xs={6}>
                <CFormInput type="text" id="customerAddress" name="customerAddress" label="Address" value={customerData.customerAddress} onChange={handleChange} />
            </CCol>
            <CCol xs={6}>
                <CFormInput type="text" id="customerEmail" name="customerEmail" label="Email" value={customerData.customerEmail} onChange={handleChange} />
            </CCol>
            <CCol xs={6}></CCol>
            <CCol xs={6}>
                <CButton color="primary" type="submit"> Save </CButton>
            </CCol>
            <CCol xs={6}>
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </CCol>
        </CForm>
    );
}

export default CustomerEditForm;