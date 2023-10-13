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
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import Switch from "@mui/material/Switch";
import { green, red } from "@mui/material/colors";
import { useState } from "react";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Employees() {
  const [checkedStates, setCheckedStates] = React.useState([]);
  const [open, setOpen] = React.useState();

  const handleChange = (employeeId) => {
    const newCheckedStates = [...checkedStates];

    setCheckedStates(newCheckedStates);
    // Update the checked state for the current employeeId
    const updatedEmployeeId = employeeId;
    setEmployeeId(updatedEmployeeId);
    setOpen(true);

    // You can now use the 'employeeId' here as needed.
    console.log("Employee ID:", employeeId);
  };

  const navigate = useNavigate();
  const [employees, setEmployees] = React.useState([]);
  const [employeeId, setEmployeeId] = useState();
  const getEmployees = async () => {
    let response = await axios.get(`${api_url}show-all-employee`);
    setEmployees(response?.data?.employees);
  };

  React.useEffect(() => {
    getEmployees();
  }, []);

  const [employeeStatus, setEmployeeStatus] = React.useState();
  const updateEmployeeStatus = async () => {
    try {
      // Make the API call to change the employee status
      const response = await axios.put(
        `${api_url}toggle-employee-status/${employeeId}`
      );

      // Update the employee status in the state
      const newEmployeeStatus = response.data.employeeStatus;
      setEmployeeStatus(newEmployeeStatus);

      // Close the dialog
      setOpen(false);

      // If the new status is "enabled," update the switch's checked state
      if (newEmployeeStatus === "enabled") {
        const updatedCheckedStates = checkedStates.map((state, index) =>
          index ===
          employees.findIndex((employee) => employee.employeeId === employeeId)
            ? true
            : state
        );
        setCheckedStates(updatedCheckedStates);
      }
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error updating employee status: ", error);
    }
  };

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
                        <StyledTableCell align="left">
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
                          checked={
                            row.employeeStatus === "enable" ? true : false
                          }
                          onChange={(event) => handleChange(row.employeeId)} // Pass employeeId here
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
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to enable
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Box mr={2}>
              <Button
                variant="Outlined"
                onClick={() => {
                  setOpen(false);
                }}
                sx={{ textTransform: "capitalize" }}
              >
                Cancel
              </Button>
            </Box>
            <Box>
              <Button
                sx={{ textTransform: "capitalize", bgcolor: "green" }}
                variant="contained"
                onClick={updateEmployeeStatus}
              >
                Disable
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
