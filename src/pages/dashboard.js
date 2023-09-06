import React, { useState, useEffect } from "react";
import DashboardTable from "@/components/DashboardTable";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Modal, Typography } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LogoutIcon from '@mui/icons-material/Logout';
import QRCode from "qrcode.react";

const Dashboard = () => {
  const [tempAuth, setTempAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    let login = localStorage.getItem("isLoggedIn")
    if (JSON.parse(login) == true){
      setTempAuth(true);
    }
  }, [])
  

  const handleLogin = (userName, password) => {
    if (userName === "admin" && password === "xobox@admin") {
      setTempAuth(true);
      localStorage.setItem("isLoggedIn", JSON.stringify(true))
    }
  };

  const handlePrevPage = () => {
    const array = data.result;
    const firstItem = array[0];

    fetch(
      `http://3.70.147.113:3001/delivery/?apartment=BGyS8YrV0Uwu6Uq0sV4c&start_before=${firstItem.id}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setData(resJson);
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  const handleNextPage = () => {
    const array = data.result;
    const lastItem = array[array.length - 1];

    fetch(
      `http://3.70.147.113:3001/delivery/?apartment=BGyS8YrV0Uwu6Uq0sV4c&start_at=${lastItem.id}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setData(resJson);
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  const fetchFunc = () => {
    fetch(`http://3.70.147.113:3001/delivery/?apartment=BGyS8YrV0Uwu6Uq0sV4c`)
      .then((res) => res.json())
      .then((resJson) => {
        setData(resJson);
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  useEffect(() => {
    fetchFunc();
  }, []);

  // QR MODAL
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(canvas);
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `xoboxqr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      {tempAuth ? (
        <>
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
              margin: "1rem",
            }}
          >
            <Typography>Admin</Typography>
            <Button onClick={() => setOpen((prev) => !prev)} variant="text">
              <QrCodeIcon />
            </Button>
            <Button onClick={() => {
              localStorage.removeItem("isLoggedIn")
              setTempAuth(false)
            }} variant="text">
              <LogoutIcon />
            </Button>
          </div>

          <Modal
            open={open}
            onClose={() => setOpen((prev) => !prev)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <QRCode
                id="qr-gen"
                size={290}
                level={"H"}
                includeMargin={true}
                value="http://3.70.147.113:3002/?apartment=BGyS8YrV0Uwu6Uq0sV4c"
              />
              <Button
                onClick={downloadQRCode}
                variant="outlined"
                style={{ marginTop: "30px" }}
              >
                Download QR Code
              </Button>
            </Box>
          </Modal>

          <DashboardTable entries={data?.result || []} />
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              margin: "1rem",
            }}
          >
            <Button
              onClick={handlePrevPage}
              variant="outlined"
              disabled={!data?.hasPreviousPage}
            >
              Prev
            </Button>
            <Button
              onClick={handleNextPage}
              variant="outlined"
              disabled={!data?.hasNextPage}
            >
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLogin(userName, password)}
              >
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
