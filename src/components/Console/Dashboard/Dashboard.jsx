import React, { useEffect, useState } from "react";
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
import decode from "../../Auth/hook/decode";
import { extractPermissions } from "../../Auth/hook/permissions";

const Dashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    const fetchTokenAndPermissions = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          console.warn("No token found");
          setLoading(false);
          return;
        }

        const decodedToken = decode();
      console.warn("_token_",decodedToken);
        if (!decodedToken) {
          console.warn("Invalid token");
          setLoading(false);
          return;
        }

        const extractedPermissions = extractPermissions(decodedToken);
        setPermission(extractedPermissions);
      } catch (error) {
        console.error("Error processing token or permissions:", error);
      } finally {
        setTimeout(() => setLoading(false), 2000); // Simulate loading
      }
    };

    fetchTokenAndPermissions();
  }, []);

  const cardStyling = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxShadow: "none",
    border: theme.palette.mode === "light" ? "1px solid #E4E4E7" : "1px solid #27272A",
    background: theme.palette.mode === "dark" ? "transparent" : "white",
    width: "full",
  };

  const cardData = [
    {
      route: "/console/register",
      title: "Registration",
      description: "Customer registration form",
      icon: <BookMarked color="cyan" />,
      permissionKey: null, // No specific permission required
    },
    {
      route: "/console/list",
      title: "Customer List",
      description: "View Customers",
      icon: <LayoutList color="orange" />,
      permissionKey: "Customers.access", // Requires `Customers.access` permission
    },
  ];

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
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={3}>
          {cardData.map(
            ({ route, title, description, icon, permissionKey }, index) => {
              // Check if the user has the required permission for this card
              if (permissionKey && !permission?.[permissionKey.split('.')[0]]?.[permissionKey.split('.')[1]]) {
                return null;
              }

              return (
                <Grid item xs={10} sm={5} md={3} key={index}>
                  <Link to={route} style={{ textDecoration: "none" }}>
                    <Card sx={{ ...cardStyling }}>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "100%",
                        }}
                      >
                        <Typography
                          component="div"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "serif",
                            fontWeight: "bold",
                            fontSize: "x-large",
                          }}
                        >
                          {icon} &nbsp;{title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ marginTop: 1, marginLeft: 2, opacity: "0.6" }}
                        >
                          {description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              );
            }
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
