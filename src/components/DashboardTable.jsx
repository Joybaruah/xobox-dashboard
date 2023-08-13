import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';



const DashboardTable = ({ entries }) => {

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <div style={{marginLeft: '8px'}}>
      <Typography variant="h4" gutterBottom>
        Grand Vitara Dashboard
      </Typography>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Apartment Number</TableCell>
              <TableCell>User Name (Owner)</TableCell>
              <TableCell>User ID (Owner)</TableCell>
              <TableCell>DA Organisation</TableCell>
              <TableCell>DA Name</TableCell>
              <TableCell>DA Phone Number</TableCell>
              <TableCell>GDA Checkin Time</TableCell>
              <TableCell>DA Checkout Time</TableCell>
              <TableCell>Delivery Duration</TableCell>
              <TableCell>Transaction Status</TableCell>
              <TableCell>Delivery Box Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.apartmentNumber}</TableCell>
                <TableCell>{entry.userNameOwner}</TableCell>
                <TableCell>{entry.userIdOwner}</TableCell>
                <TableCell>{entry.daOrganisation}</TableCell>
                <TableCell>{entry.daName}</TableCell>
                <TableCell>{entry.daPhoneNumber}</TableCell>
                <TableCell>{entry.gdaCheckinTime}</TableCell>
                <TableCell>{entry.daCheckoutTime}</TableCell>
                <TableCell>{entry.deliveryDuration}</TableCell>
                <TableCell style={entry.transactionStatus === 'Completed' ? {color: 'green'} : {color: 'red'}}>
                  {entry.transactionStatus}
                </TableCell> 
                <TableCell>{entry.deliveryBoxNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DashboardTable;
