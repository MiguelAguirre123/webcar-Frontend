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
    const getPublications = async () => {
      try {
          // Obtener el token del localStorage o de las cookies
          const token = localStorage.getItem('token'); // Suponiendo que hayas almacenado el token en el localStorage

          // Configurar los headers de la solicitud para incluir el token
          const config = {
              headers: {
                  Authorization: `Bearer ${token}`, // Incluir el token en el encabezado Authorization
                  'Content-Type': 'application/json'
              }
          };

          // Realizar la solicitud GET con la configuración de los headers
          const response = await Axios.get('http://localhost:1337/api/listpublication', config);
          const listPublications = Object.keys(response.data).map(i => response.data[i]);
          setPublicationData(listPublications.flat());
      } catch (error) {
          console.log(error);
          navigate('/login');
      }
  };

  getPublications();
  },[]);

  function handleCreatePublication(event){
    navigate('/users/publicationform');
  }

  function handleEditPublication(publicationId){
    navigate(`/users/publicationeditform/${publicationId}`)
  }

  const handleDisablePublication = async (publicationId) => {
    try {
        // Construir la URL completa para la solicitud PUT
        const url = 'http://localhost:1337/api/disablepublication/'+publicationId;

        // Obtener el token del localStorage
        const token = localStorage.getItem('token');

        // Verificar si hay un token almacenado
        if (!token) {
            console.log("Token not found in localStorage");
            return; // Abortar la función si no se encuentra el token
        }

        // Configurar los headers de la solicitud para incluir el token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        // Enviar la solicitud PUT al servidor para deshabilitar la publicación
        const response = await Axios.put(url, {}, config);

        // Verificar si la respuesta es exitosa
        if (response.status === 200) {
            console.log("Publication disabled successfully");
            window.location.reload(); // Recargar la página después de deshabilitar la publicación
        } else {
            console.log("Error disabling publication:", response.statusText);
            // Manejar el error si la solicitud no es exitosa
        }
    } catch (error) {
        console.log("Error:", error.message);
        navigate('/login');
        // Manejar cualquier error de la solicitud
    }
};

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