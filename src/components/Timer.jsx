import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'; // Import the Box component

const ReverseTimer = ({ durationInSeconds, onTimeout }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(durationInSeconds);

  useEffect(() => {
    if (remainingSeconds > 0) {
      const intervalId = setInterval(() => {
        setRemainingSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Cleanup: Clear the interval when the component unmounts or when the timer reaches 0
      return () => {
        clearInterval(intervalId);
      };
    } else {
      // Call the callback function when the timer reaches 0
      onTimeout();
    }
  }, [remainingSeconds, onTimeout]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
      {remainingSeconds > 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center"> {/* Use the Box component for centering */}
          <Typography variant="h5" component="p">
            Time Remaining:
          </Typography>
          <Typography variant="h4" component="p">
            {formatTime(remainingSeconds)}
          </Typography>
        </Box>
      ) : (
        <Typography variant="h5" component="p" color="secondary">
          Logging you out
        </Typography>
      )}
    </Paper>
  );
};

export default ReverseTimer;
