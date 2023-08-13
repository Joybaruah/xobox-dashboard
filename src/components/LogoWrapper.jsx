import React from 'react';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import XoboxLogo from "../images/xobox.jpg"

const LogoWrapper = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ marginBottom: '16px' }}>
      <Image
        src= {XoboxLogo}// Replace with the actual path to your logo image
        alt="Logo"
        width={200}         
        height={80} 
      />
    </Grid>
  );
};

export default LogoWrapper;
