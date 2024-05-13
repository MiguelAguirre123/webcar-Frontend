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


const ProductForm = () => {
ñ
    const [productData, setProductData] = useState({
        productId: '',
        productName:'',
        productDescription: '',
        productPrice:'',
        customerId:''

    });

    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setProductData({
            ...productData,
            [name]: value
        });
    }

    function handleReturn(event) {
        navigate('/products/product');
    }

    const handleSubmit = async (event) => {
        try {
            const response = await Axios.post('http://localhost:1337/api/createproduct', productData);
            console.log(response.data);
            navigate('');
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={6}>
                <CFormInput type="text" id="productName" name="productName" label="Name" value={productData.productName} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
                <CFormInput type="text" id="productDescription" name="productDescription" label="Description" value={productData.productDescription} onChange={handleChange} />
            </CCol>
            <CCol xs={6}>
                <CFormInput type="text" id="productPrice" name="productPrice" label="Price" value={productData.productPrice} onChange={handleChange} />
            </CCol>
            <CCol xs={6}>
            </CCol>
            <CCol xs={6}>
                <CButton color="primary" type="submit"> Save </CButton>
            </CCol>
            <CCol xs={6}>
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </CCol>
        </CForm>
    )
}

export default ProductForm