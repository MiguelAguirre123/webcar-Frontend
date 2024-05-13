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

const Publication = () => {

  const [publicationData, setPublicationData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getPublications = async() =>{
      const response = await Axios({
        url: 'http://localhost:1337/api/listpublication'
      });
      const listPublications = Object.keys(response.data).map(i=> response.data[i]);
      setPublicationData(listPublications.flat());
    }

    getPublications();
  },[]);

  function handleCreatePublication(event){
    navigate('/users/publicationform');
  }

  function handleEditPublication(publicationId){
    navigate(`/users/publicationeditform/${publicationId}`)
  }

  const handleDisablePublication = async(publicationId) => {
    try{
      var url = "http://localhost:1337/api/disablepublication/"+publicationId;
      const response = await Axios.put(url);
      window.location.reload();
    }
    catch(e){
      console.log(e)
    }
  }

  const columns = [
    {
      title: 'descriptionPublication',
      dataIndex: 'publicationContent'
    },
    {
      title: 'userId',
      dataIndex: 'userId'
    },
    {
      title: 'Options',
      render: (text, record) => (
        <div>
          <CButton onClick={() => handleEditPublication(record.publicationId)}><CIcon icon={cilPencil}/></CButton>
          <CButton onClick={() => handleDisablePublication(record.publicationId)}><CIcon icon={cilTrash}/></CButton>
        </div>
      )
    }
  ]

  return (
    <div>
      <CButton onClick={handleCreatePublication}>New Publication</CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            {columns.map((column, index) => (
              <CTableHeaderCell key={index}>{column.title}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {publicationData.map((publication, index) => (
            <CTableRow key={index}>
              {columns.map((column, columnIndex) => (
                <CTableDataCell key={columnIndex}>
                  {column.render ? column.render(publication[column.dataIndex], publication) : publication[column.dataIndex]}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Publication