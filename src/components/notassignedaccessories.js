import * as React from "react";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import Sidebar from "./Sidebar";
import { Box, Typography, TextField } from "@mui/material";
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
  { name: "Monitor", notassigned: "15" },
  { name: "CPU", notassigned: "15" },
  { name: "Mouse", notassigned: "15" },
  { name: "Keyboard", notassigned: "15" },
  { name: "Chairs", notassigned: "15" },
];
export default function NotAssignedAccessories() {
  const navigate = useNavigate();
  const [accessories, setAccessories] = React.useState([]);
  const getAccessories = async () => {
    let response = await axios.get(`${api_url}get-asset-names`);
    console.log(response);
    setAccessories(response?.data?.assets);
  };
  React.useEffect(() => {
    getAccessories();
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
              paddingBottom: "10px",
              paddingLeft: "10px",
            }}
          >
            Not Assigned Accessories
            <TextField
              label="Search"
              sx={{ width: "250px", marginLeft: "500px" }}
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
                    <StyledTableCell align="left">
                      Accessories Name
                    </StyledTableCell>
                    <StyledTableCell align="left">Not Assigned</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accessories.map((row, index) => {
                    const currentRowId = row._id;
                    return (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          onClick={() => {
                            navigate(`/editasset/${row.assetName}`);
                          }}
                        >
                          <span className="view-button"> {row?.assetName}</span>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.notAssignedCount}
                        </StyledTableCell>
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



