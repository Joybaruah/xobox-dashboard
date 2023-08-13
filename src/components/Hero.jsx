import React from 'react';
import Container from '@mui/material/Container';
import SvgIcon from '@mui/material/SvgIcon';
import { styled } from '@mui/system';
import DeliverySvg from '../images/delivery.svg';

const HeroContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f8f8f8',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(2),
  flexDirection: 'row', 
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

// Define the SVG as a custom Material-UI icon component
const MySvgIcon = (props) => (
  <SvgIcon {...props}>
    <img src={DeliverySvg} alt="Delivery Icon" width="100%" height="auto" />
  </SvgIcon>
);

const HeroComponent = () => {
  return (
    <HeroContainer maxWidth="lg">
      <MySvgIcon
        viewBox="0 0 1144 651.26"
        sx={{
          width: '100%',
          height: 'auto',
        }}
      />
    </HeroContainer>
  );
};

export default HeroComponent;
