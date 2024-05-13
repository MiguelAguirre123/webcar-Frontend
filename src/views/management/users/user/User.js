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
      const response = await Axios({
        url: 'http://localhost:1337/api/listusers'
      });
      const listUsers = Object.keys(response.data).map(i=> response.data[i]);
      setUserData(listUsers.flat());
    }

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
      var url = "http://localhost:1337/api/disableuser/" + userId;
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
      <CButton onClick={handleCreateUser}> New User </CButton>
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