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
    const [ProductData, setProductData] = useState({
        productName: '',
        productId: '',
        productDescription: '',
        productPrice: '', 
    });

    const [hasLoadedProduct, setHasLoadedProduct] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            const response = await Axios.get(`http://localhost:1337/api/getProduct/${productId}`);
            const product = response.data.data;
            setProductData(product);
            setHasLoadedProduct(true);
        };
        
        if (!hasLoadedProduct) {
            getProduct();
        }
    }, [productId, hasLoadedProduct]);

    function handleChange(event) {
        const { name, value } = event.target;
        setProductData({
            ...ProductData,
            [name]: value
        });
    }

    function handleReturn(event) {
        navigate('/products/product');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios.put(`http://localhost:1337/api/updateproduct/${productId}`, ProductData);
            console.log(response.data);
            navigate('/products/product');
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
                <CFormInput type="text" id="productName" name="productName" label="Name" value={ProductData.productName} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="productId" name="productId" label="Id" value={ProductData.productId} onChange={handleChange} />
            </CCol>
            <CCol xs={12}>
                <CFormInput type="text" id="productDescription" name="productDescription" label="Description" value={ProductData.productDescription} onChange={handleChange} />
            </CCol>
            <CCol xs={12}>
                <CFormInput type="text" id="productPrice" name="productPrice" label="Price" value={ProductData.productPrice} onChange={handleChange} />
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