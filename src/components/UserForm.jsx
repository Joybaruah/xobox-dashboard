import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

const UserForm = () => {

  const router = useRouter()

  // userData can be broken into delivaryAgentData and userData
  const [userData, setUserData] = useState({
    userName: '',
    userMobile: '',
    agentBadgeNo: '',
    agentOrganization: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

//   two ways to pass the response to home
// 1. by query: router.push("/home?data=data")
// 2. make a global state provider, then
// const { setValue } = useValue();
// async function handleSubmit(event) {
//   const response = await getResponse();
//   setValue(response);
//   router.push("/home");
// }
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted with data:', userData);
    try {
        // const response = await axios.post('http://localhost:5000/calculate', userData);
        if (true){
            console.log('response success, go to home')
            router.push('/home')
        }
    } catch (error) {
        console.log('err - ', error)
    }
    // clear form input
    setUserData({
        userName: '',
        userMobile: '',
        agentBadgeNo: '',
        agentOrganization: '',
    })
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
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
            value={userData.userMobile}
            onChange={handleInputChange}
            variant="outlined"
            required
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
  );
};

export default UserForm;
