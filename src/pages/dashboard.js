import React, { useState, useEffect } from "react";
import DashboardTable from "@/components/DashboardTable";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// this will come from api call
const entriesSample = [
    {
      apartmentNumber: 'A101',
      userNameOwner: 'John Doe',
      userIdOwner: 'User123',
      daOrganisation: 'Delivery Inc.',
      daName: 'Delivery Agent 1',
      daPhoneNumber: '+1 123-456-7890',
      gdaCheckinTime: '2023-08-10 08:00:00',
      daCheckoutTime: '2023-08-10 17:30:00',
      deliveryDuration: '9:30',
      transactionStatus: 'Completed',
      deliveryBoxNumber: 'Box 123',
    },
    {
      apartmentNumber: 'B202',
      userNameOwner: 'Jane Smith',
      userIdOwner: 'User456',
      daOrganisation: 'Delivery Express',
      daName: 'Delivery Agent 2',
      daPhoneNumber: '+1 987-654-3210',
      gdaCheckinTime: '2023-08-11 09:15:00',
      daCheckoutTime: '2023-08-11 17:00:00',
      deliveryDuration: '7:45',
      transactionStatus: 'Pending',
      deliveryBoxNumber: 'Box 456',
    },
  ];
const Dashboard = () => {
  const [tempAuth, setTempAuth] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1);

  const handleLogin = (userName, password) => {

    if(userName === 'admin' && password === 'password'){
        setTempAuth(true);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const fetchFunc = () => {
    fetch(`/?page=${page}`)
      .then((res) => res.json())
      .then((resJson) => {
        setEntries(resJson.something);
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  useEffect(() => {
    fetchFunc();
  }, [page]);

  return (
    <div>
      {tempAuth ? (
        <>
          <DashboardTable entries={entriesSample} />
          <div style={{ marginTop: "8px" }}>
            <Button
              onClick={handlePrevPage}
              variant="outlined"
              disabled={page <= 1}
            >
              Prev
            </Button>
            <Button onClick={handleNextPage} variant="outlined">
              Next
            </Button>
          </div>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <div>
            <TextField
              label="Enter UserName"
              variant="outlined"
              margin="normal"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Enter Password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fullWidth
            />
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" color="primary" onClick={() => handleLogin(userName, password)}>
              Login
            </Button>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
};

export default Dashboard;
