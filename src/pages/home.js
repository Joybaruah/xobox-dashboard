import React, { useState } from "react";
import ReverseTimer from "../components/Timer";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import HeroComponent from "@/components/Hero";
import axios from "axios";

const Home = () => {
  const router = useRouter();
  const {data} = router.query;
  const [unlockPressed, setUnlockPressed] = useState(false);

  console.log("data from form - ", data);

  const handleDelivered = async () => {

    console.log("delivered clicked");
    const response = await axios.post('https://7ae4-117-233-240-35.ngrok-free.app/delivery/delivered', JSON.parse(data));
    console.log('response from delivered', response)
    if(response.status === 200){
      router.push('/thankyou')
    }
  }

  const handleClick = async () => {
    setUnlockPressed(true);
    const response = await axios.post('https://7ae4-117-233-240-35.ngrok-free.app/delivery/unlock', JSON.parse(data));
    console.log('response from unlock', response)
  };

  const handleTimeout = () => {
    router.push("/timeout");
  };

  return (
    <Container>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={6}>
          <div style={{ marginBottom: "8px" }}>
            <ReverseTimer durationInSeconds={200} onTimeout={handleTimeout} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Unlock
            </Button>
          </div>
          {unlockPressed ? (
            <div style={{ display: "flex", justifyContent: "center", marginTop: '8px' }}>
            <Button variant="contained" color="success" onClick={handleDelivered}>
              Delivered
            </Button>
          </div>
          ): null}


          {/* <div>
            <HeroComponent />
          </div> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
