import * as React from "react";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
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
const filteredUsers = [{}];
export default function EmployeeName() {
  const navigate = useNavigate();
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
              paddingBottom: "60px",
            }}
          >
            Employee Name
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Typography
              sx={{
                fontSize: "16px",
                width: "200px",
                marginRight: "20px",
              }}
            >
              Employee Name
            </Typography>
            <TextField sx={{ width: "500px" }} />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Typography
              sx={{
                fontSize: "16px",
                width: "200px",
                marginRight: "20px",
              }}
            >
              Employee ID
            </Typography>
            <TextField sx={{ width: "500px" }} />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Typography
              sx={{
                fontSize: "16px",
                width: "200px",
                marginRight: "20px",
              }}
            >
              Email ID
            </Typography>
            <TextField sx={{ width: "500px" }} />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Typography
              sx={{
                fontSize: "16px",
                width: "200px",
                marginRight: "20px",
              }}
            >
              Phone Number
            </Typography>
            <TextField sx={{ width: "500px" }} />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Typography
              sx={{
                fontSize: "16px",
                width: "200px",
                marginRight: "20px",
              }}
            >
              Assigned_Monitor_No.
            </Typography>
            <TextField sx={{ width: "500px" }} />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Typography
              sx={{
                fontSize: "16px",
                width: "200px",
                marginRight: "20px",
              }}
            >
              Assigned_CPU
            </Typography>
            <TextField sx={{ width: "500px" }} />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Typography
              sx={{
                fontSize: "16px",
                width: "200px",
                marginRight: "20px",
              }}
            >
              Assigned_Mouse
            </Typography>
            <TextField sx={{ width: "500px" }} />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Typography
              sx={{
                fontSize: "16px",
                width: "200px",
                marginRight: "20px",
              }}
            >
              Assigned_Keyboard
            </Typography>
            <TextField sx={{ width: "500px" }} />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Typography
              sx={{
                fontSize: "16px",
                width: "200px",
                marginRight: "20px",
              }}
            >
              Assigned_Chairs
            </Typography>
            <TextField sx={{ width: "500px" }} />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="850px"
            mt={4}
          >
            <Button
              sx={{
                bgcolor: "green",
                color: "white",
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingTop: "10px",
                paddingBottom: "10px",
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
          </Box>
        </Box>
      </Box>
    </div>
  );
}
