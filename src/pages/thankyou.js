import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Thankyou = () => {
  return (
    <Container>
      <Paper
        elevation={3}
        style={{
          padding: '16px',
          textAlign: 'center',
          marginTop: '16px',
        }}
      >
        <Typography
          variant="h6"
          component="p"
          color="primary"
          style={{ fontWeight: 'bold', marginTop: '16px' }}
        >
          Thank you for the delivery !
        </Typography>
      </Paper>
    </Container>
  );
};

export default Thankyou;
