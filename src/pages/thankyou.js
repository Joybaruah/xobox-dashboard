import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LogoWrapper from '@/components/LogoWrapper';

const Thankyou = () => {
  return (
    <div style={{marginTop: '48px'}}>
        <Container>
            <LogoWrapper /> 
            <Paper
                elevation={3}
                style={{
                padding: '16px',
                textAlign: 'center',
                marginTop: '32px',
                }}
            >
                <Typography
                variant="h6"
                component="p"
                color="primary"
                style={{ fontWeight: 'bold', marginTop: '16px' }}
                >
                Thank you for the delivery!
                </Typography>
            </Paper>
        </Container>
    </div>
  );
};

export default Thankyou;
