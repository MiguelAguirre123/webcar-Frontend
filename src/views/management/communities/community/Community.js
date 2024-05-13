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
        const response = await Axios({
          url: 'http://localhost:1337/api/listCommunity'
        });
        const listCommunities = Object.keys(response.data).map(i => response.data[i]);
        setCommunityData(listCommunities.flat());
        console.log("Community Data:", listCommunities.flat());
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    }
  
    getCommunities();
  }, []);
  

  function handleCreateCommunities() {
    navigate('/communities/communityform');
  }

  function handleEditCommunity(communityId) {
    navigate(`/communities/communityeditform/${communityId}`)
  }

  const handleDisableCommunity = async (communityId) => {
    try {
      var url = `http://localhost:1337/api/disableCommunity/${communityId}`;
      const response = await Axios.put(url);
      window.location.reload();
    }
    catch (e) {
      console.log(e)
    }
  }

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