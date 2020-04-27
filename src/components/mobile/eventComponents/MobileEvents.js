import React, {useState, useEffect} from 'react'
import MobileTemplateContainer from './MobileTemplateContainer.js'
import styled from 'styled-components'
import axios from 'axios';
import { useAuth } from '../../../contexts/auth';


const getTemplateList = async ({ googleId }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${googleId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };


const MobileEvents = ({formOpen, setTemplateList, templateList}) => {

    const { googleApi, api } = useAuth();
    const { currentUser} = googleApi;

    useEffect(() => {
        (async () => {
          const templates = await getTemplateList(currentUser);
          setTemplateList(templates);
        })();
      }, [currentUser, formOpen]);

      //???
      const [events, setEvents] = useState(null);

      // get events from api and set to state
      useEffect(() => {
        (async () => {
          try {
            const data = await api.listEvents();
            setEvents(data);
          } catch (error) {
            console.log(error);
          }
        })();
      }, [api]);


    return(
          <FixedMobile>
            <MobileTemplateContainer templateList={templateList}/>
            </FixedMobile>
    )
}

export default MobileEvents


const FixedMobile = styled.div`
    border: 5px black;
    `

