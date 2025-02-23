import { Box, Card, Grid, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CountUp from "react-countup";
import { api_url } from "../apiutils";
import { useEffect, useState } from "react";
import React from "react";

const size = {
  width: 550,
  height: 400,
};
function Dashboard() {
  const [empCount, SetempCount] = useState([]);
  const employeeCount = async (e) => {
    let response = await axios.get(`${api_url}show-all-employee`);
    //axios used to connect with the api url
    SetempCount(response.data?.employees);
    console.log("data", response.data?.employees);
  };

  useEffect(() => {
    employeeCount();
  }, []);

  const [accessories, setAccessories] = React.useState([]);
  const getAccessories = async () => {
    let response = await axios.get(`${api_url}get-asset-names`);
    console.log(response);
    setAccessories(response?.data?.assets);
  };
  React.useEffect(() => {
    getAccessories();
  }, []);
  console.log(accessories);

  // Sum the totalCount values from the accessories array
  const accessoriesTotalCount = accessories.reduce((total, accessory) => {
    return total + accessory.totalCount;
  }, 0);

  const accessoriesAssignedCount = accessories.reduce((total, accessory) => {
    return total + accessory.assignedCount;
  }, 0);

  const accessoriesNotAssignedCount = accessories.reduce((total, accessory) => {
    return total + accessory.notAssignedCount;
  }, 0);
  // const data = [
  //   { value: 12, label: "Employees" },
  //   { value: 25, label: "Total Accessories" },
  //   { value: 10, label: "Assigned Accessories" },
  //   { value: 15, label: "Not Assigned Accessories" },
  // ];

  const data = [
    { value: empCount.length, label: "Employees" },
    { value: accessoriesTotalCount, label: "Total Accessories" },
    { value: accessoriesAssignedCount, label: "Assigned Accessories" },
    {
      value: accessoriesNotAssignedCount,
      label: "Not Assigned Accessories",
    },
  ];

  const navigate = useNavigate();
  const cardInfo = [{ icon: <ArrowCircleRightIcon />, arrow: "Arrow" }];
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <Box height={80} />
          <Typography
            sx={{ fontSize: "30px", fontWeight: "bold", paddingBottom: "10px" }}
          >
            Dashboard
          </Typography>
          <Box height={2} />
          {/* main grid */}
          <Grid container spacing={1}>
            {/* Employees */}
            <Grid item sm={6}>
              <Card
                sx={{
                  bgcolor: "#D32F2F",
                  position: "relative",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item sm={4}>
                    <Box p={2}>
                      <Typography
                        sx={{
                          fontSize: "66px",
                          fontWeight: "bold",
                          color: "#FFFFFF",
                        }}
                      >
                        <CountUp end={empCount.length} duration={3} />
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sm={8}>
                    <Box sx={{ position: "absolute", top: "50px" }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "medium",
                          color: "#FFFFFF",
                        }}
                      >
                        Employees
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sm={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "#EF5350",
                        color: "#FFFFFF",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/employees");
                      }}
                    >
                      <Typography sx={{ fontSize: "14px" }}>
                        More info
                      </Typography>
                      <ArrowCircleRightIcon sx={{ fontSize: "14px" }} />
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            {/* Accessories */}
            <Grid item sm={6}>
              <Card sx={{ backgroundColor: "#1565C0", position: "relative" }}>
                <Grid container spacing={1}>
                  <Grid item sm={4}>
                    <Box p={2}>
                      <Typography
                        sx={{
                          fontSize: "66px",
                          fontWeight: "bold",
                          color: "#FFFFFF",
                        }}
                      >
                        <CountUp end={accessoriesTotalCount} duration={3} />
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sm={4}>
                    <Box sx={{ position: "absolute", top: "50px" }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "medium",
                          color: "#FFFFFF",
                        }}
                      >
                        Accessories
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sm={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "#1976D2",
                        color: "#FFFFFF",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/accessories");
                      }}
                    >
                      <Typography sx={{ fontSize: "14px" }}>
                        More info
                      </Typography>
                      <ArrowCircleRightIcon sx={{ fontSize: "14px" }} />
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            {/* Assigned Accessories */}
            <Grid item sm={6}>
              <Card
                sx={{
                  bgcolor: "#2E7D32",
                  position: "relative",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item sm={4}>
                    <Box p={2}>
                      <Typography
                        sx={{
                          fontSize: "66px",
                          fontWeight: "bold",
                          color: "#FFFFFF",
                        }}
                      >
                        <CountUp end={accessoriesAssignedCount} duration={3} />
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sm={8}>
                    <Box sx={{ position: "absolute", top: "50px" }}>
                      <Typography
                        // variant="h5"
                        sx={{
                          fontSize: "35px",
                          fontWeight: "medium",
                          color: "#FFFFFF",
                        }}
                      >
                        Assigned Accessories
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sm={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "#388E3C",
                        color: "#FFFFFF",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/assignedaccessories");
                      }}
                    >
                      <Typography sx={{ fontSize: "14px" }}>
                        More info
                      </Typography>
                      <ArrowCircleRightIcon sx={{ fontSize: "14px" }} />
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            {/* Not Assigned Accessories */}
            <Grid item sm={6}>
              <Card
                sx={{
                  bgcolor: "#757575",
                  position: "relative",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item sm={4}>
                    <Box p={2}>
                      <Typography
                        sx={{
                          fontSize: "66px",
                          fontWeight: "bold",
                          color: "#FFFFFF",
                        }}
                      >
                        <CountUp
                          end={accessoriesNotAssignedCount}
                          duration={3}
                        />
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sm={8}>
                    <Box sx={{ position: "absolute", top: "50px" }}>
                      <Typography
                        // variant="h5"
                        sx={{
                          fontSize: "30px",
                          fontWeight: "medium",
                          color: "#FFFFFF",
                        }}
                      >
                        Not Assigned Accessories
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item sm={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "#616161",
                        color: "#FFFFFF",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/notassignedaccessories");
                      }}
                    >
                      <Typography sx={{ fontSize: "14px" }}>
                        More info
                      </Typography>
                      <ArrowCircleRightIcon sx={{ fontSize: "14px" }} />
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
          {/* piechart */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "30px",
            }}
          >
            <PieChart
              colors={["#D32F2F", "#1565C0", "#2E7D32", "#757575"]}
              series={[
                {
                  arcLabel: (item) => ` (${item.value})`,
                  arcLabelMinAngle: 45,
                  data,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontWeight: "bold",
                },
              }}
              {...size}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default Dashboard;
