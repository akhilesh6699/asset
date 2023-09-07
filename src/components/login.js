import React from "react";
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
const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "90vh",
    width: 380,
    margin: "20px auto",
    marginLeft: "30px",
    backgroundColor: "#e8efff",
    borderRadius: "50px",
  };
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
              id="Username"
              class="form-control custom-input"
              placeholder="Enter username"
            />
          </div>
        </Box>
        <Box mt={2} 
        sx={{marginBottom: "10px"}}>
          <input 
            type="Password"
            class="form-control custom-input"
            placeholder="Enter password"
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
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
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
        >
          LOGIN
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
