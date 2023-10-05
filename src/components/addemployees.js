import * as React from "react";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { api_url } from "../apiutils";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
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
export default function AddEmployees() {
  const navigate = useNavigate();
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const addEmployees = async () => {
    if (!name || !email || !phoneNumber) {
      toast.error("Please fill in all fields.");
    } else if (validator.isEmail(email)) {
      // Check if phoneNumber has exactly 10 digits
      if (/^\d{10}$/.test(phoneNumber)) {
        console.log("hello");

        const formData = {
          name: name,
          email: email,
          phone: phoneNumber,
        };
        let response = await axios.post(`${api_url}employee/store`, formData);
        console.log(response);
        toast.success("Employee added successfully.");
        // navigate("/employees");
        setName("");
        setEmail("");
        setPhoneNumber("");
      } else {
        toast.warning("Phone number must be 10 digits.");
      }
    } else {
      toast.warning("Enter a valid email.");
    }
  };

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
            Add Employees
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Typography
              sx={{
                fontSize: "20px",
                width: "140px",
                marginRight: "20px",
              }}
            >
              Name
            </Typography>
            <TextField
              sx={{ width: "500px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Typography
              sx={{
                fontSize: "20px",
                width: "140px",
                marginRight: "20px",
              }}
            >
              Email-ID
            </Typography>
            <TextField
              sx={{ width: "500px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Typography
              sx={{
                fontSize: "20px",
                width: "140px",
                marginRight: "20px",
              }}
            >
              Phone Number
            </Typography>
            <TextField
              sx={{ width: "500px" }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
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
              onClick={addEmployees}
            >
              Submit
            </Button>
          </Box>
          {/* <Box mt={4}>
              <Button
              sx={{bgcolor: "green",
              color: "white",
              alignItems: "center" ,
              paddingLeft: "30px",
              paddingRight: "30px",
              paddingTop: "10px",
              paddingBottom: "10px",
              fontSize: "20px",
              fontWeight: "bold",
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: '#E65100',
              }}}>
                Submit
                </Button>
              </Box> */}
        </Box>
      </Box>
    </div>
  );
}
