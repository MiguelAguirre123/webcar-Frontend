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
} from '@coreui/icons'

const Product = () => {

  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const { customerId } = useParams();

  useEffect(()=>{
    const getProducts = async() =>{
      const response = await Axios({
        url: `http://localhost:1337/api/listproduct/${customerId}`
      });
      const listProducts = Object.keys(response.data).map(i=> response.data[i]);
      setProductData(listProducts.flat());
    }

    getProducts();
  },[]);

  function handleCreateProduct(event){
    navigate(`/customers/productform/${customerId}`);
  }

  function handleEditProduct(ProductId){
    navigate(`/customers/producteditform/${ProductId}`)
  }

  function handleReturn(event){
    navigate('/customers/productbycustomer/');
  }

  const handleDisableProduct = async(ProductId) => {
    try{
      var url = "http://localhost:1337/api/disableProduct/" + ProductId;
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
          <CButton onClick={() => handleEditProduct(record.productId)}><CIcon icon={cilPencil}/></CButton>
          <CButton onClick={() => handleDisableProduct(record.productId)}><CIcon icon={cilTrash}/></CButton>
        </div>
      )
    }
  ]

  return (
    <div>
      <CButton onClick={handleCreateProduct}> New Product </CButton>
      <CButton onClick={handleReturn}> Return </CButton>
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
  )
}

export default Product;