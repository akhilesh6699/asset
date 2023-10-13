import * as React from "react";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { api_url } from "../apiutils";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Typography, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import Switch from "@mui/material/Switch";
import { green, red } from "@mui/material/colors";
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

// const filteredUsers = [
//   {
//     id: "2341",
//     name: "vinay",
//     email: "egafgaf@gmail.com",
//     number: "9897968564",
//   },
// ];
export default function Employees() {
  const [checkedStates, setCheckedStates] = React.useState([]);

  const handleChange = (event, index) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = event.target.checked;
    setCheckedStates(newCheckedStates);
  };

  const navigate = useNavigate();
  const [employees, setEmployees] = React.useState([]);
  const getEmployees = async () => {
    let response = await axios.get(`${api_url}show-all-employee`);
    //console.log(response);
    setEmployees(response?.data?.employees);
  };

  React.useEffect(() => {
    getEmployees();
    // getEmpDetails();
  }, []);
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <Box height={80} />
          <Typography
            sx={{ fontSize: "30px", fontWeight: "bold", paddingBottom: "10px" }}
          >
            Employees
            <TextField
              label="Search"
              sx={{ width: "250px", marginLeft: "700px" }}
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
            />
          </Typography>
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              border: "1px solid",
              background: "#fff",
              color: "#fff",
            }}
          >
            <TableContainer>
              <Table
                sx={{ minWidth: 700, boxShadow: "none" }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sl. no</StyledTableCell>
                    <StyledTableCell align="left">Employee ID</StyledTableCell>
                    <StyledTableCell align="left">
                      Employee Name
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Employee Email
                    </StyledTableCell>
                    <StyledTableCell align="left">Phone Number</StyledTableCell>
                    <StyledTableCell align="left">Actions</StyledTableCell>
                    <StyledTableCell align="left">
                      Assigned/Not Assigned
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((row, index) => {
                    const currentRowId = row._id;
                    return (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.employeeId}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          // onClick={() => {
                          //   navigate("/employeename");
                          // }}
                          // sx={{
                          //   cursor: "pointer",
                          // }}
                        >
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.phone}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          onClick={() => {
                            navigate(`/employeedetails/${row.employeeId}`);
                          }}
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <span className="view-employee">View</span>
                          <Visibility />
                        </StyledTableCell>
                        <Switch
                          inputProps={{ "aria-label": "controlled" }}
                          color={checkedStates[index] ? "primary" : "secondary"}
                          sx={{
                            "& .MuiSwitch-thumb": {
                              backgroundColor: checkedStates[index]
                                ? green[500]
                                : red[500],
                            },
                            "& .MuiSwitch-track": {
                              backgroundColor: checkedStates[index]
                                ? green[500]
                                : red[500],
                            },
                          }}
                          checked={checkedStates[index]}
                          onChange={(event) => handleChange(event, index)}
                        />
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}
