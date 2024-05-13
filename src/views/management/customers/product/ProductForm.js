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

    const [productData, setProductData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        customerId: '',
    });
    const navigate = useNavigate();
    const { customerId } = useParams();

    function handleChange(event){
        const {name, value} = event.target;
        setProductData({
            ...productData,
            [name]: value
        });
    }

    function handleReturn(event){
        navigate(`/customers/product/${customerId}`);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const response = await Axios.post('http://localhost:1337/api/createProduct', productData);
            console.log(response.data);
            navigate(`/customers/product/${customerId}`);
        }
        catch (e){
            console.log(e);
        }
    }

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
                    label="User" 
                    value={productData.customerId} 
                    onChange={handleChange} 
                />
            </CCol>
            <CCol md={6}></CCol>
            <CCol md={1}>
                <CButton color="primary" type="submit"> Save </CButton>
            </CCol>
            <CCol md={1}>
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </CCol>
        </CForm>
    );
}

export default ProductForm