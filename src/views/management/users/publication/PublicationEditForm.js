import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CButton
} from '@coreui/react'

const PublicationEditForm = () => {

    const {publicationId} = useParams();
    const [publicationData, setPublicationData] = useState({
        publicationContent: '',
        userId: 0
    });
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [hasLoadedPublication, setHasLoadedPublication] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{

        const getPublication = async () => {
            try {
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
        
                // Enviar la solicitud GET al servidor para obtener la publicación
                const response = await Axios.get(`http://localhost:1337/api/getpublication/${publicationId}`, config);
                
                // Verificar si la respuesta es exitosa
                if (response.status === 200) {
                    const publication = response.data.data;
                    setPublicationData(publication);
                    setSelectedUser(publication.userId);
                    setHasLoadedPublication(true);
                } else {
                    console.log("Error fetching publication:", response.statusText);
                    // Manejar el error si la solicitud no es exitosa
                }
            } catch (error) {
                console.log("Error:", error.message);
                navigate('/login');
                // Manejar cualquier error de la solicitud
            }
        };
        

        /*
        const getUsers = async () => {
            const response = await Axios({url:`http://localhost:1337/api/listuser`});
            const lstUsers = Object.keys(response.data).map(i=> response.data[i]);
            setUsers(lstUsers.flat());
        }

        getUsers();
        */

        if(!hasLoadedPublication)
            getPublication();

    },[selectedUser, publicationId, hasLoadedPublication]);

    function handleSelectUsers(event){
        setSelectedUser(event.target.value);
        setPublicationData({
            ...publicationData,
            userId: parseInt(event.target.value)
        })
    }

    function handleChange(event){
        const {name, value} = event.target;
        setPublicationData({
            ...publicationData,
            [name]: value
        });
    }

    function handleReturn(event){
        navigate('/users/publication');
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
                      // Obtener el token del localStorage o de las cookies
          const token = localStorage.getItem('token'); // Suponiendo que hayas almacenado el token en el localStorage

          // Configurar los headers de la solicitud para incluir el token
          const config = {
              headers: {
                  Authorization: `Bearer ${token}`, // Incluir el token en el encabezado Authorization
                  'Content-Type': 'application/json'
              }
          };
            const response = await Axios.put(`http://localhost:1337/api/updatepublication/${publicationId}`, publicationData, config);
            console.log(response.data);
            navigate('/users/publication');
        }
        catch (e){
            console.log(e);
            navigate('/login');
        }
    }

    return(
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
                <CFormInput type="text" id="publicationContent" name="publicationContent" label="Description" value={publicationData.publicationContent} onChange={handleChange} />
            </CCol>
            <CCol xs={6}>
                <CButton color="primary" type="submit" >Save</CButton>
            </CCol>
            <CCol xs={6}>
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </CCol>
        </CForm>
    )
}

export default PublicationEditForm