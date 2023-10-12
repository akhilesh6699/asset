import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { api_url } from "../apiutils";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F4F7FA",
    color: "#477BA1",
    margin: "10px 0",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F7F9FB",
  },
  "&:last-child td, &:last-child th": {
    borderBottom: 0,
  },
}));
const filteredUsers = [
  { name: "Emp Name" },
  { name: "Emp ID" },
  { name: "Email" },
  { name: "Phone Number" },
  { name: "Monitor_No" },
  { name: "Cpu_No" },
  { name: "Mouse_No" },
  { name: "Keyboard_No" },
  { name: "Chairs_No" },
];
export default function EmployeeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [empDetails, SetEmpDetails] = React.useState();
  const getEmpDetails = async () => {
    let response = await axios.get(`${api_url}show-employee/${id}`);
    console.log(response.data?.employee);
    console.log(id);
    SetEmpDetails(response?.data?.employee);
  };

  React.useEffect(() => {
    getEmpDetails();
  }, []);
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <Box height={80} />
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "bold",
              paddingBottom: "50px",
            }}
          >
            Employee Details
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={4}>
                    Name:
                  </Grid>
                  <Grid item sm={4}>
                    {empDetails?.name}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={4}>
                    Employee ID:
                  </Grid>
                  <Grid item sm={4}>
                    {empDetails?.employeeId}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={4}>
                    Email ID:
                  </Grid>
                  <Grid item sm={4}>
                    {empDetails?.email}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={4}>
                    Phone No:
                  </Grid>
                  <Grid item sm={4}>
                    {empDetails?.phone}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={4}>
                    Assigned Assets:
                  </Grid>
                  <Grid item sm={4}>
                    <ul>
                      {empDetails?.assets.map((asset, index) => (
                        <li key={index}>{asset}</li>
                      ))}
                    </ul>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
