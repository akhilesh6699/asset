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
import { Box, Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { api_url } from "../apiutils";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
  // const addAccessories = async (name) => {
  //   if (name === "Monitor") {
  //     let response = await axios.post(`${api_url}assign-monitor-id`);
  //   } else if (name == "CPU") {
  //     let response = await axios.post(`${api_url}assign-cpu-id`);
  //   } else if (name == "Mouse") {
  //     let response = await axios.post(`${api_url}assign-mouse-id`);
  //   } else if (name == "Keyboard") {
  //     let response = await axios.post(`${api_url}assign-keyboard-id`);
  //   } else if (name == "Chairs") {
  //     let response = await axios.post(`${api_url}assign-chair-id`);
  //   }

  // let response = await axios.post(`${api_url}add`);

  // };

  const navigate = useNavigate();
  const [accessoryName, setAccessoryName] = React.useState("");
  //const [quantity, setQuantity] = React.useState(1);
  const addAccessories = async () => {
    try {
      // Check if the accessory name already exists in the assets array
      if (assets.some((asset) => asset.accessoryName === accessoryName)) {
        // If it exists, display an alert message
        toast.error("Accessory name already exists!");
      } else {
        // If it doesn't exist, proceed with adding the accessory
        const data = {
          accessoryName: accessoryName,
        };
        let response = await axios.post(`${api_url}add-accessories`, data);
        console.log(response);

        toast.success("added");

        // Reload the page after successfully adding an accessory
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const [assets, setAssets] = React.useState([]);
  const getAssets = async () => {
    let response = await axios.get(`${api_url}get-accessories`);
    console.log(response);
    console.log();
    setAssets(response.data?.accessories);
  };
  React.useEffect(() => {
    getAssets();
  }, []);

  // const [addAsset, setAddAsset] = React.useState([]);
  // const getAddAsset = async () => {
  //   let response = await axios.post(`${api_url}store-assets`);
  //   console.log(response);
  // };

  // const updateAssets = async () => {
  //   try {
  //     const data = {
  //       quantity: quantity, // Add quantity to the data
  //     };
  //     let response = await axios.post(`${api_url}store-assets`, data);
  //     console.log(response);
  //     toast.success("added");
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };

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
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "medium",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingRight: "50px",
              }}
            >
              <TextField
                label="Enter Asset name"
                size="small"
                sx={{ width: "250px" }}
                value={accessoryName}
                onChange={(e) => setAccessoryName(e.target.value)}
              />
              <Button
                sx={{
                  bgcolor: "green",
                  color: "white",
                  marginLeft: "30px",
                  fontSize: "10px",
                  padding: "10px",
                  fontWeight: "medium",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#E65100",
                  },
                }}
                onClick={addAccessories}
              >
                ADD
              </Button>
            </Typography>
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
                    <StyledTableCell align="left">SL. No</StyledTableCell>
                    <StyledTableCell align="left">
                      Accessories Name
                    </StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assets.map((row, index) => {
                    const currentRowId = row._id;
                    return (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.accessoryName}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{ display: "flex", cursor: "pointer" }}
                        >
                          <InfoOutlinedIcon
                            sx={{
                              display: "flex",
                              cursor: "pointer",
                              marginRight: "100px",
                            }}
                            onClick={() => {
                              if (row.name === "Monitor") {
                                navigate("/monitor");
                              } else if (row.name === "CPU") {
                                navigate("/cpu");
                              } else if (row.name === "Mouse") {
                                navigate("/mouse");
                              } else if (row.name === "Keyboard") {
                                navigate("/keyboard");
                              } else if (row.name === "Chairs") {
                                navigate("/chairs");
                              }
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
