import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Skeleton,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom"; // Assuming you are using react-router-dom
import { BookMarked, LayoutList } from "lucide-react";

const Dashboard = () => {
  const theme = useTheme()
  const [loading, setLoading] = useState(true);
  
  // Simulate loading state
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  // Show skeleton loader while loading
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "fit-content",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Grid container spacing={2}>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={100}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "80vh",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          {/* Registration Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/console/register" style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxShadow: "none",
                  border: "1px solid",

                  background:
                    theme.palette.mode === "dark" ? "#121212" : "white",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "serif",
                      fontWeight: "bold",
                    }}
                  >
                    <BookMarked /> &nbsp; Registration
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Customer registration form
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          {/* Customer List Card */}
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/console/list" style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxShadow: "none",
                  border: "1px solid",

                  background:
                    theme.palette.mode === "dark" ? "#121212" : "white",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "serif",
                      fontWeight: "bold",
                    }}
                  >
                    <LayoutList /> &nbsp; Customer List
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 2 }}>
                    View Customers
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
