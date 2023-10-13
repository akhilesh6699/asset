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
import { Box, Typography, TextField, Button } from "@mui/material";
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
export default function EditAsset() {
  const [checked, setChecked] = React.useState(true);
  // const [assetName, setAssetName] = React.useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const navigate = useNavigate();

  const { name } = useParams();
  const [assetDetails, setAssetDetails] = React.useState([]);
  const getAssetDetails = async () => {
    let response = await axios.get(`${api_url}asset-details/${name}`);

    setAssetDetails(response?.data?.assetDetails);
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
                    <StyledTableCell align="left">Monitor ID</StyledTableCell>
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
                          {row?.employeeName}
                        </StyledTableCell>
                        <Switch
                          inputProps={{ "aria-label": "controlled" }}
                          color={checked ? "primary" : "secondary"}
                          sx={{
                            "& .MuiSwitch-thumb": {
                              backgroundColor: checked ? green[500] : red[500],
                            },
                            "& .MuiSwitch-track": {
                              backgroundColor: checked ? green[500] : red[500],
                            },
                          }}
                          checked={checked}
                          onChange={handleChange}
                        />
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
