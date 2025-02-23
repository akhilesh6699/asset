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
import { useState } from "react";
import { toast } from "react-toastify";
export default function Assign() {
  const [name, setName] = React.useState("");
  const [accessory, setAccessories] = React.useState("");
  const [ids, setIds] = React.useState([]);
  const [emp, setEmp] = React.useState([]);
  const [assignedId, setAssignedId] = React.useState();
  const [empId, setEmpId] = React.useState();
  const [assetId, setAssetId] = useState();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleChange1 = async (event) => {
    setAccessories(event.target.value);
    let response = await axios.get(
      `${api_url}asset-name/${event.target.value}`
    );
    setIds(response?.data?.assetIds);
    console.log("assets", response.data.assetIds);
  };
  // const handleChangeId = async (event) => {
  //   setAssignedId(event.target.value);
  // };

  const [assets, setAssets] = React.useState([]);
  const getAssets = async () => {
    let response = await axios.get(`${api_url}get-asset-names`);

    setAssets(response.data?.assets);
    console.log(response.data);
  };
  React.useEffect(() => {
    getAssets();
  }, []);

  const getEmp = async () => {
    let response = await axios.get(`${api_url}show-all-employee`);
    console.log(response);
    setEmp(response.data.employees);
  };
  React.useEffect(() => {
    getEmp();
  }, []);

  console.log(empId);
  console.log(assetId);
  const handleSubmit = async () => {
    if (name === "") {
      toast.warning("please enter the name");
      return;
    }
    try {
      let response = await axios.post(`${api_url}assign-assets/${empId}`, {
        assetId: assetId,
      });
      toast.success("Asset assigned successfully.");
      setName("");
      setAccessories("");
      setAssignedId("");
      console.log("response assign", response);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong !");
    }
  };
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
              <MenuItem
                key={emps._id}
                value={emps.name}
                onClick={() => setEmpId(emps?.employeeId)}
              >
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
            value={accessory}
            label="Assets"
            onChange={handleChange1}
          >
            {assets.map((asset) => (
              <MenuItem key={asset._id} value={asset.assetName}>
                {asset.assetName}
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
            value={assignedId}
            label="Asset_ID"
            // onChange={handleChangeId}
          >
            {ids.map((id) => (
              <MenuItem key={id} value={id} onClick={() => setAssetId(id)}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>{" "}
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
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
