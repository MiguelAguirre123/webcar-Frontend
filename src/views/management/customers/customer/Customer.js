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
} from '@coreui/icons';

const Customer = () => {
  const [customerData, setCustomerData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCustomers = async () => {
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

        // Realizar la solicitud GET con la configuración de los headers
        const response = await Axios.get('http://localhost:1337/api/listCustomer', config);
        const listCustomers = Object.keys(response.data).map(i => response.data[i]);
        setCustomerData(listCustomers.flat());
        console.log("Customer Data:", listCustomers.flat());
      } catch (error) {
        console.error("Error fetching customers:", error);
        navigate('/login');
      }
    };

    getCustomers();
  }, [navigate]);

  function handleCreateCustomers() {
    navigate('/customers/customerform');
  }

  function handleEditCustomer(customerId) {
    navigate(`/customers/customereditform/${customerId}`);
  }

  const handleDisableCustomer = async (customerId) => {
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

      // Construir la URL completa para la solicitud PUT
      const url = `http://localhost:1337/api/disableCustomer/${customerId}`;

      // Enviar la solicitud PUT al servidor para deshabilitar el cliente
      const response = await Axios.put(url, {}, config);

      // Verificar si la respuesta es exitosa
      if (response.status === 200) {
        console.log("Customer disabled successfully");
        window.location.reload();
      } else {
        console.log("Error disabling customer:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error.message);
      navigate('/login');
    }
  };

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
      dataIndex: 'customerDescription'
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
          <CButton onClick={() => handleEditCustomer(record.customerId)}><CIcon icon={cilPencil} /></CButton>
          <CButton onClick={() => handleDisableCustomer(record.customerId)}><CIcon icon={cilTrash} /></CButton>
        </div>
      )
    }
  ];

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
  );
}

export default Customer;
