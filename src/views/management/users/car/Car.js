import React, { useEffect, useState } from 'react';
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
} from '@coreui/icons'

const Car = () => {

  const [carData, setCarData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getCars = async() =>{
      const response = await Axios({
        url: 'http://localhost:1337/api/listcar'
      });
      const listcars = Object.keys(response.data).map(i=> response.data[i]);
      setCarData(listcars.flat());
    }

    getCars();
  },[]);

  function handleCreateCar(event){
    navigate('/users/carform');
  }

  function handleEditCar(carId){
    navigate(`/users/careditform/${carId}`)
  }

  const handleDisableCar = async(carId) => {
    try{
      var url = "http://localhost:1337/api/disablecar/" + carId;
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
      dataIndex: 'carName'
    },
    {
      title: 'Model',
      dataIndex: 'carModel'
    },
    {
      title: 'Brand',
      dataIndex: 'carBrand'
    },
    {
      title: 'User',
      dataIndex: 'userId'
    }, 
    {
      title: 'Options',
      render: (text, record) => (
        <div>
          <CButton onClick={() => handleEditCar(record.carId)}><CIcon icon={cilPencil}/></CButton>
          <CButton onClick={() => handleDisableCar(record.carId)}><CIcon icon={cilTrash}/></CButton>
        </div>
      )
    }
  ]

  return (
    <div>
      <CButton onClick={handleCreateCar}> New Car </CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            {columns.map((column, index) => (
              <CTableHeaderCell key={index}>{column.title}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {carData.map((car, index) => (
            <CTableRow key={index}>
              {columns.map((column, columnIndex) => (
                <CTableDataCell key={columnIndex}>
                  {column.render ? column.render(car[column.dataIndex], car) : car[column.dataIndex]}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Car;
