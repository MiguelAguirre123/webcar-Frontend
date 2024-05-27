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

const Community = () => {
  const [communityData, setCommunityData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCommunities = async () => {
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
        const response = await Axios.get('http://localhost:1337/api/listCommunity', config);
        const listCommunities = Object.keys(response.data).map(i => response.data[i]);
        setCommunityData(listCommunities.flat());
        console.log("Community Data:", listCommunities.flat());
      } catch (error) {
        console.error("Error fetching communities:", error);
        navigate('/login');
      }
    };

    getCommunities();
  }, [navigate]);

  function handleCreateCommunities() {
    navigate('/communities/communityform');
  }

  function handleEditCommunity(communityId) {
    navigate(`/communities/communityeditform/${communityId}`)
  }

  const handleDisableCommunity = async (communityId) => {
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
      const url = `http://localhost:1337/api/disableCommunity/${communityId}`;

      // Enviar la solicitud PUT al servidor para deshabilitar la comunidad
      const response = await Axios.put(url, {}, config);

      // Verificar si la respuesta es exitosa
      if (response.status === 200) {
        console.log("Community disabled successfully");
        window.location.reload();
      } else {
        console.log("Error disabling community:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error.message);
      navigate('/login');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'communityName'
    },
    {
      title: 'Creator',
      dataIndex: 'communityCreator'
    },
    {
      title: 'Description',
      dataIndex: 'communityDescription'
    },
    {
      title: 'Options',
      render: (text, record) => (
        <div>
          <CButton onClick={() => handleEditCommunity(record.communityId)}><CIcon icon={cilPencil} /></CButton>
          <CButton onClick={() => handleDisableCommunity(record.communityId)}><CIcon icon={cilTrash} /></CButton>
        </div>
      )
    }
  ]

  return (
    <div>
      <CButton onClick={handleCreateCommunities}>New Community</CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            {columns.map((column, index) => (
              <CTableHeaderCell key={index}>{column.title}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {communityData.map((community, index) => (
            <CTableRow key={index}>
              {columns.map((column, columnIndex) => (
                <CTableDataCell key={columnIndex}>
                  {column.render ? column.render(community[column.dataIndex], community) : community[column.dataIndex]}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Community;
