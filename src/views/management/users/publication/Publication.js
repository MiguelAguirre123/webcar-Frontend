/*import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';   
import CIcon from '@coreui/icons-react';
import Axios from 'axios';
import {
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell
} from '@coreui/react';
import {
  cilPencil,
  cilTrash
} from '@coreui/icons'

const Restaurant = () => {

  const [restaurantData, setRestaurantData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getRestaurants = async() =>{
      const response = await Axios({
        url: 'http://localhost:1337/api/listrestaurant'
      });
      const listRestaurants = Object.keys(response.data).map(i=> response.data[i]);
      setRestaurantData(listRestaurants.flat());
    }

    getRestaurants();
  },[]);

  function handleCreateRestaurant(event){
    navigate('/restaurants/restaurantform');
  }

  function handleEditRestaurant(restaurantId){
    navigate(`/restaurants/restauranteditform/${restaurantId}`)
  }

  const handleDisableRestaurant = async(restaurantId) => {
    try{
      var url = "http://localhost:1337/api/disablerestaurant/"+restaurantId;
      const response = await Axios.put(url);
      window.location.reload();
    }
    catch(e){
      console.log(e)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'restaurantName'
    },
    {
      title: 'NIT',
      dataIndex: 'restaurantNit'
    },
    {
      title: 'Address',
      dataIndex: 'restaurantAddress'
    },
    {
      title: 'Phone',
      dataIndex: 'restaurantPhone'
    },
    {
      title: 'City',
      dataIndex: 'cityId'
    },
    {
      title: 'Options',
      render: (text, record) => (
        <div>
          <CButton onClick={() => handleEditRestaurant(record.restaurantId)}><CIcon icon={cilPencil}/></CButton>
          <CButton onClick={() => handleDisableRestaurant(record.restaurantId)}><CIcon icon={cilTrash}/></CButton>
        </div>
      )
    }
  ]

  return (
    <div>
      <CButton onClick={handleCreateRestaurant}>New Restaurant</CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            {columns.map((column, index) => (
              <CTableHeaderCell key={index}>{column.title}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {restaurantData.map((restaurant, index) => (
            <CTableRow key={index}>
              {columns.map((column, columnIndex) => (
                <CTableDataCell key={columnIndex}>
                  {column.render ? column.render(restaurant[column.dataIndex], restaurant) : restaurant[column.dataIndex]}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Restaurant*/