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

const Customer = () => {

  const [customerData, setcustomerData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getcustomer = async() =>{
      const response = await Axios({
        url: 'http://localhost:1337/api/listCustomer'
      });
      const listCustomers = Object.keys(response.data).map(i=> response.data[i]);
      setcustomerData(listCustomers.flat());
    }

    getcustomer();
  },[]);

  function handleCreateCustomers(event){
    navigate('/customers/customerForm');
  }

  function handleEditCustomer(customerId){
    navigate(`/customers/CustomerEditForm/${customerId}`)
  }

  const handleDisableCustomer = async(customerId) => {
    try{
      var url = "http://localhost:1337/api/disableCustomer/"+customerId;
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
      dataIndex: 'customerName'
    },
    {
      title: 'Phone',
      dataIndex: 'customerPhone'
    },
    {
      title: 'Description',
      dataIndex: 'customerDescrip'
    },
    {
      title: 'Address',
      dataIndex: 'customerAddress'
    },
    {
      title: 'Email',
      dataIndex: 'customerEmail'
    },
    {

      title: 'Options',
      render: (text, record) => (
        <div>
          <CButton onClick={() => handleEditCustomer(record.customerId)}><CIcon icon={cilPencil}/></CButton>
          <CButton onClick={() => handleDisableCustomer(record.customerId)}><CIcon icon={cilTrash}/></CButton>
        </div>
      )
    }
  ]

  return (
    <div>
      <CButton onClick={handleCreateCustomers}>New Customer</CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            {columns.map((column, index) => (
              <CTableHeaderCell key={index}>{column.title}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {customerData.map((customer, index) => (
            <CTableRow key={index}>
              {columns.map((column, columnIndex) => (
                <CTableDataCell key={columnIndex}>
                  {column.render ? column.render(customer[column.dataIndex], customer) : customer[column.dataIndex]}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Customer