import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const Product = () => {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const { customerId } = useParams();

  useEffect(() => {
    const getProducts = async () => {
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
        const response = await Axios.get(`http://localhost:1337/api/listproduct/${customerId}`, config);
        const listProducts = Object.keys(response.data).map(i => response.data[i]);
        setProductData(listProducts.flat());
      } catch (error) {
        console.error("Error fetching products:", error);
        navigate('/login');
      }
    };

    getProducts();
  }, [customerId, navigate]);

  function handleCreateProduct() {
    navigate(`/customers/productform/${customerId}`);
  }

  function handleEditProduct(ProductId) {
    navigate(`/customers/producteditform/${ProductId}`);
  }

  function handleReturn() {
    navigate('/customers/productbycustomer/');
  }

  const handleDisableProduct = async (ProductId) => {
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
      const url = `http://localhost:1337/api/disableProduct/${ProductId}`;

      // Enviar la solicitud PUT al servidor para deshabilitar el producto
      const response = await Axios.put(url, {}, config);

      // Verificar si la respuesta es exitosa
      if (response.status === 200) {
        console.log("Product disabled successfully");
        window.location.reload();
      } else {
        console.log("Error disabling product:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error.message);
      navigate('/login');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'productName'
    },
    {
      title: 'Description',
      dataIndex: 'productDescription'
    },
    {
      title: 'Price',
      dataIndex: 'productPrice'
    },
    {
      title: 'Options',
      render: (text, record) => (
        <div>
          <CButton onClick={() => handleEditProduct(record.productId)}><CIcon icon={cilPencil} /></CButton>
          <CButton onClick={() => handleDisableProduct(record.productId)}><CIcon icon={cilTrash} /></CButton>
        </div>
      )
    }
  ];

  return (
    <div>
      <CButton onClick={handleCreateProduct}>New Product</CButton>
      <CButton onClick={handleReturn}>Return</CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            {columns.map((column, index) => (
              <CTableHeaderCell key={index}>{column.title}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {productData.map((product, index) => (
            <CTableRow key={index}>
              {columns.map((column, columnIndex) => (
                <CTableDataCell key={columnIndex}>
                  {column.render ? column.render(product[column.dataIndex], product) : product[column.dataIndex]}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
}

export default Product;
