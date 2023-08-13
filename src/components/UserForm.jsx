import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import LogoWrapper from './LogoWrapper';
import axios from 'axios';

const UserForm = () => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const router = useRouter()

  // userData can be broken into delivaryAgentData and userData
  const [userData, setUserData] = useState({
    userName: '',
    userMobile: '',
    agentBadgeNo: '',
    agentOrganization: '',
    apartment: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted with data:', userData);
    try {
        console.log('userData', userData);
        const response = await axios.post('http://3.70.147.113:3001/delivery/checkin', userData);
        console.log('res from axios', response)

        if(response.status === 200){
          console.log('response.data', response.data)
          // router.push(`/home/?data=${response.data}`)
          router.push({
            pathname: '/home',
            query: {data: JSON.stringify(response.data)}
          })
        }

        // if(response.status === 400){

        
        // }
    } catch (error) {
          console.log('error.response.data', error.response.data)
        //   showAlert(true);
        //   setAlertMsg(error.response.data)
        //   setUserData({
        //     userName: '',
        //     userMobile: '',
        //     agentBadgeNo: '',
        //     agentOrganization: '',
        //     apartment: ''
        // })
    }
    // clear form input
    setUserData({
        userName: '',
        userMobile: '',
        agentBadgeNo: '',
        agentOrganization: '',
        apartment: ''
    })
  };
  return (
    <>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
          <LogoWrapper />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Owner Details
          </Typography>
          <TextField
            label="User Name"
            id="userName"
            name="userName"
            value={userData.userName}
            onChange={handleInputChange}
            variant="outlined"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="User Mobile"
            id="userMobile"
            name="userMobile"
            type="number"
            value={userData.userMobile}
            onChange={handleInputChange}
            variant="outlined"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Apartment"
            id="apartment"
            name="apartment"
            value={userData.apartment}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Delivery Agent Details
          </Typography>
          <TextField
            label="Agent Badge No"
            id="agentBadgeNo"
            name="agentBadgeNo"
            value={userData.agentBadgeNo}
            onChange={handleInputChange}
            variant="outlined"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Agent Organization"
            id="agentOrganization"
            name="agentOrganization"
            value={userData.agentOrganization}
            onChange={handleInputChange}
            variant="outlined"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Check In
          </Button>
        </Grid>
      </Grid>
    </form>

      {/* <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Opps - {}
          </Typography>
      </Grid> */}

    </>
  );
};

export default UserForm;
