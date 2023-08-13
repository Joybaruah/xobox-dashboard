import React from 'react';
import ReverseTimer from '../components/Timer';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const Home = () => {
  const router = useRouter();

  const handleClick = () => {
    console.log('unlock clicked');
    console.log('make an api call');

    // if(true){
    //     router.push('/home')
    // }
  };

  const handleTimeout = () => {
    // log the delivery agent out
    // show him/her the timeout page
    router.push('/timeout');
  };

  return (
    <Container>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ minHeight: '100vh' }} 
      >
        <Grid item xs={12} sm={6}>
          <div style={{ marginBottom: '8px' }}>
            <ReverseTimer durationInSeconds={20} onTimeout={handleTimeout} />
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" color="success" onClick={handleClick}>
                Unlock
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
