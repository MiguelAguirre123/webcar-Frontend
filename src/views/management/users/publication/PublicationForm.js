/*import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CButton
} from '@coreui/react'

const RestaurantForm = () => {

    const [restaurantData, setRestaurantData] = useState({
        restaurantName: '',
        restaurantNit: '',
        restaurantAddress:'',
        restaurantPhone: '',
        cityId: 0
    });
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const getDepartments = async () => {
            const response = await Axios({url:`http://localhost:1337/api/listdepartment`});
            const lstDepartments = Object.keys(response.data).map(i=> response.data[i]);
            setDepartments(lstDepartments.flat());
        }

        const getCities = async(departmentId)=>{
            const response = await Axios({url:`http://localhost:1337/api/listcity/${departmentId}`});
            const lstCities = Object.keys(response.data).map(i=> response.data[i]);
            setCities(lstCities.flat());
        }

        getDepartments();

        if(selectedDepartment !== "")
            getCities(selectedDepartment);

    },[selectedDepartment]);

    function handleSelectDepartments(event){
        setSelectedDepartment(event.target.value);
    }

    function handleSelectCities(event){
        setSelectedCity(event.target.value);
        setRestaurantData({
            ...restaurantData,
            cityId: event.target.value
        })
    }

    function handleChange(event){
        const {name, value} = event.target;
        setRestaurantData({
            ...restaurantData,
            [name]: value
        });
    }

    function handleReturn(event){
        navigate('/restaurants/restaurant');
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const response = await Axios.post('http://localhost:1337/api/createrestaurant', restaurantData);
            console.log(response.data);
            navigate('/restaurants/restaurant');
        }
        catch (e){
            console.log(e);
        }
    }

    return(
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
                <CFormInput type="text" id="restaurantName" name="restaurantName" label="Name" value={restaurantData.restaurantName} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="restaurantNit" name="restaurantNit" label="Nit" value={restaurantData.restaurantNit} onChange={handleChange} />
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="departmentOptions" label = "Department" value={ selectedDepartment} onChange={handleSelectDepartments} >
                    <option value="">Select a department</option>
                    {departments.map(opcion =>(
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>
            </CCol>
            <CCol xs={4}>
                <CFormSelect id="cityOptions" label = "City" value={ selectedCity} onChange={handleSelectCities} >
                    <option value="">Select a city</option>
                    {cities.map(opcion =>(
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>
            </CCol>
            <CCol xs={4}>
                <CFormInput type="text" id="restaurantAddress" name="restaurantAddress" label="Address" value={restaurantData.restaurantAddress} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="restaurantPhone" name="restaurantPhone" label="Phone" value={restaurantData.restaurantPhone} onChange={handleChange} />
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

export default RestaurantForm*/