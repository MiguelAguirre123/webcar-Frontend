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

const User = () => {

  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getUsers = async() =>{
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

          const response = await Axios.get('http://localhost:1337/api/listusers', config);
          const listUsers = Object.keys(response.data).map(i=> response.data[i]);
          setUserData(listUsers.flat());
          console.log("User Data: ", listUsers.flat());
        } catch (error){
          console.error("Error fetching users:", error);
          navigate('/login');
        }
    };

    getUsers();
  },[]);



  function handleCreateUser(event){
    navigate('/users/userform');
  }

  function handleEditUser(userId){
    navigate(`/users/usereditform/${userId}`)
  }

  const handleDisableUser = async(userId) => {
    try{
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

      const url = 'http://localhost:1337/api/disableuser/' + userId;
      const response = await Axios.put(url,{},config);
      // Verificar si la respuesta es exitosa
      if (response.status === 200) {
        console.log("User disabled successfully");
        window.location.reload();
      } else {
        console.log("Error disabling User:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error.message);
      navigate('/login');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'userName'
    },
    {
      title: 'Phone',
      dataIndex: 'userPhone'
    },
    {
      title: 'User',
      dataIndex: 'userNickName'
    },
    {
      title: 'Address',
      dataIndex: 'userAddress'
    },
    {
      title: 'Email',
      dataIndex: 'userEmail'
    },
    {
      title: 'Options',
      render: (text, record) => (
        <div>
          <CButton onClick={() => handleEditUser(record.userId)}><CIcon icon={cilPencil}/></CButton>
          <CButton onClick={() => handleDisableUser(record.userId)}><CIcon icon={cilTrash}/></CButton>
        </div>
      )
    }
  ]

  return (
    <div>
      <CTable>
        <CTableHead>
          <CTableRow>
            {columns.map((column, index) => (
              <CTableHeaderCell key={index}>{column.title}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {userData.map((user, index) => (
            <CTableRow key={index}>
              {columns.map((column, columnIndex) => (
                <CTableDataCell key={columnIndex}>
                  {column.render ? column.render(user[column.dataIndex], user) : user[column.dataIndex]}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default User