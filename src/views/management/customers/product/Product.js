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
} from '@coreui/icons'

const Product = () => {

  const [productData, setproductData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getProduct = async() =>{
      const response = await Axios({
        url: 'http://localhost:1337/api/listProduct'
      });
      const listproduct = Object.keys(response.data).map(i=> response.data[i]);
      setproductData(listproduct.flat());
    }

    getProduct();
  },[]);

  function handleCreateProduct(event){
    navigate('/products/productsFrom');
  }

  function handleEditProduct(productId){
    navigate(`/products/productsFrom/${productId}`)
  }

  const handleDisableProduct = async(productId) => {
    try{
      var url = "http://localhost:1337/api/disableproduct/"+productId;
      const response = await Axios.put(url);
      window.location.reload();
    }
    catch(e){
      console.log(e)
    }
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'productId'
    },
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
      <CButton onClick={handleCreateProduct}>New product</CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            {columns.map((column, index) => (
              <CTableHeaderCell key={index}>{column.title}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {productData .map((product, index) => (
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

export default Product