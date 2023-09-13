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
import { api_url } from "../apiutils";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [employees, setEmployees] = React.useState([]);
  const getEmployees = async () => {
    let response = await axios.get(`${api_url}employee/show`);
    console.log(response);
    setEmployees(response?.data?.employees);
  };
  React.useEffect(() => {
    getEmployees();
  }, []);
  return (
    <div>
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
                <StyledTableCell align="left">Employee Name</StyledTableCell>
                <StyledTableCell align="left">Employee Email</StyledTableCell>
                <StyledTableCell align="left">Phone Number</StyledTableCell>
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
                      onClick={() => {
                        navigate("/name");
                      }}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.email}</StyledTableCell>
                    <StyledTableCell align="left">{row.phone}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
