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
import { Box, Button, TextField, Typography } from "@mui/material";
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
  const params = useParams();
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
          <TableContainer>
            <Table
              sx={{ minWidth: 700, boxShadow: "none" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  {/* <StyledTableCell>Sl. no</StyledTableCell>
                    <StyledTableCell align="left">Emp Name</StyledTableCell>
                    <StyledTableCell align="left">
                      Emp ID
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Email
                    </StyledTableCell>
                    <StyledTableCell align="left">Ph No</StyledTableCell>
                    <StyledTableCell align="left">Monitor_No</StyledTableCell>
                    <StyledTableCell align="left">Cpu_No</StyledTableCell>
                    <StyledTableCell align="left">Keyboard_No</StyledTableCell>
                    <StyledTableCell align="left">Mouse_No</StyledTableCell>
                    <StyledTableCell align="left">Chairs_No</StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((row, index) => {
                  const currentRowId = row.id;
                  return (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell align="left">{row.name}</StyledTableCell>
                      <StyledTableCell align="left">{row.id}</StyledTableCell>
                      <StyledTableCell align="left">
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.number}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.monitor}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.cpu}</StyledTableCell>
                      <StyledTableCell align="left">
                        {row.mouse}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.keyboard}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.chairs}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
}
