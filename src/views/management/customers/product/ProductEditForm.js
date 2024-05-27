import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CButton
} from '@coreui/react';

const ProductEditForm = () => {
    const { productId } = useParams();
    const [productData, setProductData] = useState({
        productId: '',
        productName: '',
        productDescription: '',
        productPrice: '',
        customerId: ''
    });

    const [hasLoadedProduct, setHasLoadedProduct] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
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

                // Enviar la solicitud GET al servidor para obtener el producto
                const response = await Axios.get(`http://localhost:1337/api/getProduct/${productId}`, config);
                
           
                if (response.status === 200) {
                    const product = response.data.data;
                    setProductData(product);
                    setHasLoadedProduct(true);
                } else {
                    console.log("Error fetching product:", response.statusText);
                 
                }
            } catch (error) {
                console.log("Error:", error.message);
                navigate('/login');
          
            }
        };

        if (!hasLoadedProduct) {
            getProduct();
        }
    }, [productId, hasLoadedProduct, navigate]);

    function handleChange(event) {
        const { name, value } = event.target;
        setProductData({
            ...productData,
            [name]: value
        });
    }

    function handleReturn(event) {
        navigate(`/customers/product/${productData.customerId}`);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Obtener el token del localStorage o de las cookies
            const token = localStorage.getItem('token');

            // Configurar los headers de la solicitud para incluir el token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            };

            const response = await Axios.put(`http://localhost:1337/api/updateproduct/${productId}`, productData, config);
            console.log(response.data);
            navigate(`/customers/product/${productData.customerId}`);
        } catch (e) {
            console.log(e);
            navigate('/login');
        }
    };

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
                <CFormInput type="text" id="productName" name="productName" label="Name" value={productData.productName} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="productId" name="productId" label="Id" value={productData.productId} onChange={handleChange} />
            </CCol>
            <CCol xs={12}>
                <CFormInput type="text" id="productDescription" name="productDescription" label="Description" value={productData.productDescription} onChange={handleChange} />
            </CCol>
            <CCol xs={12}>
                <CFormInput type="text" id="productPrice" name="productPrice" label="Price" value={productData.productPrice} onChange={handleChange} />
            </CCol>
            <CCol xs={6}>
                <CButton color="primary" type="submit" >Save</CButton>
            </CCol>
            <CCol xs={6}>
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </CCol>
        </CForm>
    );
}

export default ProductEditForm;
