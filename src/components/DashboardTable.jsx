import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

const DashboardTable = ({ entries }) => {
  const dateConverter = (isoDateString) => {
    const isoDate = new Date(isoDateString);

    // Format the date and time
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = isoDate.toLocaleDateString("en-US", options);

    if (formattedDate == "Invalid Date") return ""

    return formattedDate;
  };

  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      <div style={{ marginLeft: "8px" }}>
        <Typography variant="h4" gutterBottom>
          Grand Vitara Dashboard
        </Typography>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "orange" }}>Check In</TableCell>
              <TableCell style={{ color: "orange" }}>Delivery</TableCell>
              <TableCell style={{ color: "orange" }}>Retrieved</TableCell>
              <TableCell style={{ color: "green" }}>Status</TableCell>
              <TableCell style={{ color: "blue" }}>Agent Name</TableCell>
              <TableCell style={{ color: "blue" }}>Agent Number</TableCell>
              <TableCell style={{ color: "blue" }}>Org</TableCell>
              <TableCell style={{ color: "coral" }}>User name (owner)</TableCell>
              <TableCell style={{ color: "coral" }}>Cabin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell style={{ color: "orange" }}>
                  {dateConverter(entry?.checkinTs)}
                </TableCell>
                <TableCell style={{ color: "orange" }}>
                  {dateConverter(entry?.deliveredTs)}
                </TableCell>
                <TableCell style={{ color: "orange" }}>
                  {dateConverter(entry?.retrievedTs)}
                </TableCell>
                <TableCell style={{ color: "green" }}>
                  {entry?.status}
                </TableCell>
                <TableCell style={{ color: "blue" }}>{entry?.daName}</TableCell>
                <TableCell style={{ color: "blue" }}>
                  {entry?.daNumber}
                </TableCell>
                <TableCell style={{ color: "blue" }}>
                  {entry?.daOrganization}
                </TableCell>
                <TableCell style={{ color: "coral" }}>
                  {entry?.userName}
                </TableCell>
                <TableCell style={{ color: "coral" }}>
                  {entry?.deviceId}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DashboardTable;
