import React, { use, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import LogoWrapper from "./LogoWrapper";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";

const UserForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const apartment = router.query.apartment;
  const [apartmentName, setApartmentName] = useState("");

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const response = await axios.get(
          `http://3.70.147.113:3001/apartment/apartment/?id=${apartment}`
        );
        setApartmentName(response.data.name);
      } catch (error) {
        console.error("Error fetching apartment:", error);
      } finally {
        setLoading(false);
      }
    };

    if (apartment) {
      setLoading(true); // Set loading to true before fetching
      fetchApartment();
    }
  }, [apartment]);

  // userData can be broken into delivaryAgentData and userData
  const [userData, setUserData] = useState({
    userName: "",
    userMobile: "",
    daName: "",
    daNumber: "",
    daOrganization: "",
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

    userData.apartment = apartment;

    try {
      console.log("userData", userData);
      setLoading(true)
      const response = await axios.post(
        "http://3.70.147.113:3001/delivery/checkin",
        userData
      );
      console.log("res from axios", response);

      if (response.status === 200) {
        console.log("response.data", response.data);
        router.push({
          pathname: "/home",
          query: { data: JSON.stringify(response.data) },
        });
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error.response.data", error.response.data);
    }
    // clear form input
    setUserData({
      userName: "",
      userMobile: "",
      daName: "",
      daNumber: "",
      daOrganization: "",
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <LogoWrapper />
          </Grid>
          <Typography variant="h5">Welcome to {apartmentName}</Typography>
          <Grid item xs={12} mt={5}>
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
            <Typography variant="h6" gutterBottom>
              Delivery Agent Details
            </Typography>
            <TextField
              label="Agent Name"
              id="daName"
              name="daName"
              value={userData.daName}
              onChange={handleInputChange}
              variant="outlined"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Agent Number"
              id="daNumber"
              name="daNumber"
              value={userData.daNumber}
              onChange={handleInputChange}
              variant="outlined"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Agent Organization"
              id="daOrganization"
              name="daOrganization"
              value={userData.daOrganization}
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
