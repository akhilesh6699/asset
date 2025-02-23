import * as React from "react";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Switch from "@mui/material/Switch";
import { green, red } from "@mui/material/colors";
import { api_url } from "../apiutils";
import axios from "axios";
import { toast } from "react-toastify";
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
  {
    name: "vinay",
    id: "2341",
    monitor: "25",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function EditAsset() {
  // const [assetName, setAssetName] = React.useState();

  const [checkedStates, setCheckedStates] = React.useState([]);
  const [open, setOpen] = React.useState();
  const handleChange = (id) => {
    setAssetId(id);
    setOpen(true);
  };

  const updateAsset = async () => {
    try {
      // Make the API call to change the employee status
      const response = await axios.put(
        `${api_url}toggle-asset-status/${assetId}`
      );

      // Update the employee status in the state

      // Close the dialog
      setOpen(false);
       setTimeout(() => {
         window.location.reload();
       }, 1000);

      // If the new status is "enabled," update the switch's checked state
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error updating employee status: ", error);
    }
  };

  const navigate = useNavigate();

  const { name } = useParams();
  const [assetDetails, setAssetDetails] = React.useState([]);
  const [assetId, setAssetId] = React.useState([]);
  const getAssetDetails = async () => {
    let response = await axios.get(`${api_url}asset-details/${name}`);
    const assetDetailsData = response?.data?.assetDetails || [];
    const initialCheckedStates = assetDetailsData.map(
      (row) => row.employeeId !== " "
    );
    setAssetDetails(assetDetailsData);
    setCheckedStates(initialCheckedStates);
    console.log(response?.data);
  };

  React.useEffect(() => {
    getAssetDetails();
  }, []);

  const addNewAsset = async () => {
    const formData = {
      assetName: name,
    };
    let response = await axios.post(`${api_url}store-assets`, formData);
    console.log(response);
    toast.success("Asset added successfully.");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
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
              paddingBottom: "10px",
              paddingLeft: "10px",
            }}
          >
            {name}
            <Button
              sx={{
                bgcolor: "green",
                color: "white",
                marginLeft: "80px",
                fontSize: "10px",
                padding: "10px",
                fontWeight: "medium",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#E65100",
                },
              }}
              onClick={addNewAsset}
            >
              Add
            </Button>
            <TextField
              label="Search"
              sx={{ width: "250px", marginLeft: "600px" }}
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
                    <StyledTableCell align="left">Asset ID</StyledTableCell>
                    <StyledTableCell align="left">Employee ID</StyledTableCell>
                    <StyledTableCell align="left">
                      Employee Name
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Enable/Disable
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assetDetails.map((row, index) => {
                    const currentRowId = row._id;
                    return (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.assetId}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.employeeId === " " ? "------" : row?.employeeId}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.employeeName === " "
                            ? "------"
                            : row?.employeeName}
                        </StyledTableCell>
                        <Switch
                          inputProps={{ "aria-label": "controlled" }}
                          color={checkedStates[index] ? "primary" : "secondary"}
                          sx={{
                            "& .MuiSwitch-thumb": {
                              backgroundColor: checkedStates[index]
                                ? green[500]
                                : red[500],
                            },
                            "& .MuiSwitch-track": {
                              backgroundColor: checkedStates[index]
                                ? green[500]
                                : red[500],
                            },
                          }}
                          checked={
                            row.assetStatus === "not assigned" ? false : true
                          }
                          onChange={() => handleChange(row.assetId)}
                        />
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to change
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Box mr={2}>
                <Button
                  variant="Outlined"
                  onClick={() => {
                    setOpen(false);
                  }}
                  sx={{ textTransform: "capitalize" }}
                >
                  Cancel
                </Button>
              </Box>
              <Box>
                <Button
                  sx={{ textTransform: "capitalize", bgcolor: "green" }}
                  variant="contained"
                  onClick={updateAsset}
                >
                  Yes
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </div>
  );
}
