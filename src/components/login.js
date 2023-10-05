import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { api_url } from "../apiutils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const paperStyle = {
  padding: 20,
  height: "90vh",
  width: 380,
  margin: "20px auto",
  marginLeft: "30px",
  backgroundColor: "#e8efff",
  borderRadius: "50px",
};

const Login = () => {
  const navigate = useNavigate(); // used to navigate to thr routes
  const data = { username: "", password: "" };

  const [inputData, setInputData] = useState(data);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    console.log("Registered");
  }, [flag]);

  const apiCall = async (e) => {
    try {
      e.preventDefault();
      if (!inputData.username || !inputData.password) {
        alert("Enter all fields"); // if the field is empty
      } else {
        let response = await axios.post(`${api_url}login`, inputData);
        //axios used to connect with the api url
        console.log(response.data);
        navigate("/dashboard");
        toast.success("logged in successfully!!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
      // if there is an error in the input this Alert will pop up
    }
  };
  function handleData(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  const avtarStyle = { backgroundColor: " #4e88c7", marginBottom: "20px" };
  const btnstyle = { margin: "10px 0" };
  return (
    <Grid sx={{ backgroundImage: "url('/images/p4.jpg')" }}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Typography
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              marginLeft: "20px",
              fontWeight: "bold",
              fontSize: "25px",
              fontFamily: "Roboto",
            }}
          >
            ASSET TRACKER
          </Typography>
          <Avatar style={avtarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              fontFamily: "Roboto",
              marginBottom: "20px",
            }}
          >
            LOGIN{" "}
          </Typography>
        </Grid>
        {/* <TextField
          sx={{
            marginTop: "10px",
            marginBottom: "15px",
            fontFamily: "Roboto",
            borderRadius: 2,
          }}
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
        /> */}
        <Box>
          <div class="form-group">
            <input
              type="text"
              name="username"
              id="Username"
              class="form-control custom-input"
              placeholder="Enter username"
              onChange={handleData}
              value={inputData.username}
            />
          </div>
        </Box>
        <Box mt={2} sx={{ marginBottom: "10px" }}>
          <input
            type="password"
            name="password"
            id="password"
            class="form-control custom-input"
            placeholder="Enter password"
            onChange={handleData}
            value={inputData.password}
          />
        </Box>

        {/* <TextField
          sx={{
            marginBottom: "20px",
            backgroundColor: "white",
            fontFamily: "Roboto",
            borderRadius: "30px",
          }}
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        /> */}
        {/* <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          sx={{
            marginBottom: "30px",
            backgroundColor: "#D9465A",
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            fontFamily: "Roboto",
            borderRadius: "30px",
          }}
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={apiCall}
        >
          LOGIN
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
