import React, { useState } from "react";
import ReverseTimer from "../components/Timer";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import HeroComponent from "@/components/Hero";
import axios from "axios";
import LogoWrapper from "@/components/LogoWrapper";

const Home = () => {
  const router = useRouter();
  const { data } = router.query;
  const [unlockPressed, setUnlockPressed] = useState(false);

  const handleDelivered = async () => {
    console.log("delivered clicked");
    const response = await axios.post(
      "https://7ae4-117-233-240-35.ngrok-free.app/delivery/delivered",
      JSON.parse(data)
    );
    console.log("response from delivered", response);
    if (response.status === 200) {
      router.push("/thankyou");
    }
  };

  const handleClick = async () => {
    setUnlockPressed(true);
    const response = await axios.post(
      "https://7ae4-117-233-240-35.ngrok-free.app/delivery/unlock",
      JSON.parse(data)
    );
    console.log("response from unlock", response);
  };

  const handleTimeout = () => {
    router.push("/timeout");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      marginTop={4}
    >
      <Container maxWidth="sm" >
        <LogoWrapper />
        <Box
          bgcolor="white"
          p={4}
          borderRadius={4}
          boxShadow={3}
          textAlign="center"
          marginTop="32px"
        >
          <Typography variant="h4" gutterBottom>
            Time Remaining
          </Typography>
          <div style={{ marginBottom: "16px" }}>
            <ReverseTimer durationInSeconds={200} onTimeout={handleTimeout} />
          </div>
          <div style={{marginTop: '48px' }}>
            <div style={{ marginBottom: "16px" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleClick}
              >
                Unlock
              </Button>
            </div>
            {unlockPressed && (
              <div style={{ marginBottom: "16px"}}>
                <Typography variant="body1" gutterBottom>
                  Click on "Delivered" to complete the delivery.
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={handleDelivered}
                >
                  Delivered
                </Button>
              </div>
            )}
          </div>
        </Box>
      </Container>
    </Box>
    // <Box
    //   display="flex"
    //   flexDirection="column"
    //   justifyContent="center"
    //   alignItems="center"
    //   minHeight="100vh"
    //   bgcolor="#f4f6f8"
    // >
    //   <Container maxWidth="sm">
    //     <LogoWrapper />
    //     <Box
    //       bgcolor="white"
    //       p={4}
    //       borderRadius={4}
    //       boxShadow={3}
    //       textAlign="center"
    //       marginTop="16px"
    //     >
    //       <Typography variant="h4" gutterBottom>
    //         Time Remaining
    //       </Typography>
    //       <div style={{ marginBottom: "16px" }}>
    //         <ReverseTimer durationInSeconds={200} onTimeout={handleTimeout} />
    //       </div>
    //       <div style={{ marginBottom: "16px" }}>
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           size="large"
    //           onClick={handleClick}
    //         >
    //           Unlock
    //         </Button>
    //       </div>
    //       {unlockPressed && (
    //         <div style={{ marginBottom: "16px" }}>
    //           <Button
    //             variant="contained"
    //             color="success"
    //             size="large"
    //             onClick={handleDelivered}
    //           >
    //             Delivered
    //           </Button>
    //         </div>
    //       )}
    //     </Box>
    //   </Container>
    // </Box>
  );
};

export default Home;
