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
import Sidebar from "./Sidebar";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
  { name: "Monitor" },
  { name: "CPU" },
  { name: "Mouse" },
  { name: "Keyboard" },
  { name: "Chairs" },
];

export default function AddAccessories() {
  const addAccessories = async (name) => {
    if (name === "Monitor") {
      let response = await axios.post(`${api_url}assign-monitor-id`);
    } else if (name == "CPU") {
      let response = await axios.post(`${api_url}assign-cpu-id`);
    } else if (name == "Mouse") {
      let response = await axios.post(`${api_url}assign-mouse-id`);
    } else if (name == "Keyboard") {
      let response = await axios.post(`${api_url}assign-keyboard-id`);
    } else if (name == "Chairs") {
      let response = await axios.post(`${api_url}assign-chair-id`);
    }
  };
  const navigate = useNavigate();
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <Box height={80} />
          <Typography
            sx={{ fontSize: "30px", fontWeight: "bold", paddingBottom: "10px" }}
          >
            Add Accessories
          </Typography>
          <Paper
            sx={{
              width: "60%",
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
                    <StyledTableCell align="left">
                      Accessories Name
                    </StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((row) => {
                    const currentRowId = row._id;
                    return (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell align="left">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{ display: "flex", cursor: "pointer" }}
                        >
                          <RemoveIcon
                            onClick={() => {
                              navigate("/addaccessories");
                            }}
                          />
                          <Typography px={2}>1</Typography>
                          <AddIcon
                            onClick={() => {
                              navigate("/addaccessories");
                              addAccessories(row.name);
                            }}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          {/* <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="750px"
            height="100px"
            mt={4}
          >
            <Button
              sx={{
                bgcolor: "green",
                color: "white",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "30px",
                paddingBottom: "30px",
                height: "55px",
                fontSize: "20px", 
                fontWeight: "bold",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#E65100",
                },
              }}
            >
              Submit
            </Button>
          </Box> */}
        </Box>
      </Box>
    </div>
  );
}
