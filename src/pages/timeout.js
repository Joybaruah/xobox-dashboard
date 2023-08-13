import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Timeout = () => {
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
          color="#f44336"
          style={{ fontWeight: 'bold', marginTop: '16px' }}
        >
          Your time is up now
        </Typography>
      </Paper>
    </Container>
  );
};

export default Timeout;
