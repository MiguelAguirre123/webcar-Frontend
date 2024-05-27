import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CButton
} from '@coreui/react';

const ProductForm = () => {
    const [productData, setProductData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        customerId: '',
    });
    const navigate = useNavigate();
    const { customerId } = useParams();

    function handleChange(event) {
        const { name, value } = event.target;
        setProductData({
            ...productData,
            [name]: value
        });
    }

    function handleReturn() {
        navigate(`/customers/product/${customerId}`);
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

            // Enviar la solicitud POST al servidor para crear el producto
            const response = await Axios.post('http://localhost:1337/api/createProduct', productData, config);

            // Verificar si la respuesta es exitosa
            if (response.status === 200) {
                console.log("Product created successfully");
                navigate(`/customers/product/${customerId}`);
            } else {
                console.log("Error creating product:", response.statusText);
            }
        } catch (error) {
            console.log("Error:", error.message);
            navigate('/login');
        }
    };

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="productName"
                    name="productName"
                    label="Name"
                    value={productData.productName}
                    onChange={handleChange}
                />
            </CCol>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="productDescription"
                    name="productDescription"
                    label="Description"
                    value={productData.productDescription}
                    onChange={handleChange}
                />
            </CCol>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="productPrice"
                    name="productPrice"
                    label="Price"
                    value={productData.productPrice}
                    onChange={handleChange}
                />
            </CCol>
            <CCol md={6}>
                <CFormInput
                    type="text"
                    id="customerId"
                    name="customerId"
                    label="Customer ID"
                    value={productData.customerId}
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
}

export default ProductForm;
