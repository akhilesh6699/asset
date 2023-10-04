import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Sidebar from "./Sidebar";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { api_url } from "../apiutils";
export default function Assign() {
  const [name, setName] = React.useState("");
  const [accessorie, setAccessories] = React.useState("");
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleChange1 = (event) => {
    setAccessories(event.target.value);
  };

  const [assets, setAssets] = React.useState([]);
  const getAssets = async () => {
    let response = await axios.get(`${api_url}get-accessaries`);
    console.log(response);
    setAssets(response.data?.accessaries);
  };
  React.useEffect(() => {
    getAssets();
  }, []);

  const [emp, setEmp] = React.useState([]);
  const getEmp = async () => {
    let response = await axios.get(`${api_url}employee/show`);
    console.log(response);
    setEmp(response.data?.employees);
  };
  React.useEffect(() => {
    getEmp();
  }, []);
  return (
    <Box sx={{ marginLeft: "350px" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Box height={10} />
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            paddingBottom: "40px",
          }}
        >
          Assign
        </Typography>
        <FormControl sx={{ width: "350px" }}>
          <InputLabel id="demo-simple-select-label">Names</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={name}
            label="Names"
            onChange={handleChange}
          >
            {emp.map((emps) => (
              <MenuItem key={emps._id} value={emps.name}>
                {emps.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Box height={30} />
        <FormControl sx={{ width: "350px" }}>
          <InputLabel id="demo-simple-select-label">Assets</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accessorie}
            label="Assets"
            onChange={handleChange1}
          >
            {assets.map((asset) => (
              <MenuItem key={asset._id} value={asset.accessaryName}>
                {asset.accessaryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Box height={30} />
        <FormControl sx={{ width: "350px" }}>
          <InputLabel id="demo-simple-select-label">Asset ID</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accessorie}
            label="Asset_ID"
            onChange={handleChange1}
          >
            <MenuItem value={10}>Monitor</MenuItem>
            <MenuItem value={20}>CPU</MenuItem>
            <MenuItem value={30}>Mouse</MenuItem>
            <MenuItem value={40}>Keyboard</MenuItem>
            <MenuItem value={50}>Chairs</MenuItem>
          </Select>
        </FormControl>
      </Box>{" "}
      {/* <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Box height={30} />
        <FormControl sx={{ width: "350px" }}>
          <InputLabel id="demo-simple-select-label">Mouse</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accessorie}
            label="Mouse"
            onChange={handleChange1}
          >
            <MenuItem value={10}>Monitor</MenuItem>
            <MenuItem value={20}>CPU</MenuItem>
            <MenuItem value={30}>Mouse</MenuItem>
            <MenuItem value={40}>Keyboard</MenuItem>
            <MenuItem value={50}>Chairs</MenuItem>
          </Select>
        </FormControl>
      </Box>{" "}
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Box height={30} />
        <FormControl sx={{ width: "350px" }}>
          <InputLabel id="demo-simple-select-label">Keyboard</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accessorie}
            label="Keyboard"
            onChange={handleChange1}
          >
            <MenuItem value={10}>Monitor</MenuItem>
            <MenuItem value={20}>CPU</MenuItem>
            <MenuItem value={30}>Mouse</MenuItem>
            <MenuItem value={40}>Keyboard</MenuItem>
            <MenuItem value={50}>Chairs</MenuItem>
          </Select>
        </FormControl>
      </Box>{" "}
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Box height={30} />
        <FormControl sx={{ width: "350px" }}>
          <InputLabel id="demo-simple-select-label">Chairs</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accessorie}
            label="Chairs"
            onChange={handleChange1}
          >
            <MenuItem value={10}>Monitor</MenuItem>
            <MenuItem value={20}>CPU</MenuItem>
            <MenuItem value={30}>Mouse</MenuItem>
            <MenuItem value={40}>Keyboard</MenuItem>
            <MenuItem value={50}>Chairs</MenuItem>
          </Select>
        </FormControl>
      </Box> */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="350px"
        mt={4}
      >
        <Button
          sx={{
            bgcolor: "green",
            color: "white",
            paddingLeft: "30px",
            paddingRight: "30px",
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
      </Box>
    </Box>
  );
}
