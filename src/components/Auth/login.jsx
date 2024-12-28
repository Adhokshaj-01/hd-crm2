import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  IconButton,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Send, Eye, EyeOff, Mail, Lock, GripHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import logo from "../../Images/logo/favicon.ico";
import { useNavigate } from "react-router-dom";
import _auth from "./hook/auth"; // Import the _auth function

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setLoading(true); // Start loading when API call begins
    try {
      // API call to login using _auth function
      const response = await _auth(data.email, data.password);
      
      if (response.status === "success") {
        setSnackbar({
          open: true,
          message: 'Logged in, redirecting to dashboard.....',
          severity: "success",
        });

        // Redirect to the dashboard after a successful login
        setTimeout(() => {
          setLoading(true);
          navigate("/console/dashboard");
        }, 2000);
      } else {
        setSnackbar({
          open: true,
          message: response.message || "Login failed. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "An error occurred while logging in. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  // Checking authentication (redirect if token exists)
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate('/console'); // Redirect if token exists in localStorage
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card
        className="w-[100%] max-w-md mx-auto px-4"
        style={{
          background: theme.palette.mode === 'dark' ? '#121212' : 'white',
          color: theme.palette.text.primary,
          // boxShadow: "none",
          // border:'1px solid'
        }}
      >
        <CardHeader
          title={
            <div className="flex justify-between text-sky-500">
              <GripHorizontal />
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </div>
          }
        />
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`space-y-6 w-full ${loading && "opacity-50 pointer-events-none"}`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Mail className="text-gray-500" size={15} />
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <Lock className="text-gray-500" size={15} />
              <TextField
                id="password"
                label="Password"
                type={passwordVisible ? "text" : "password"}
                variant="outlined"
                size="small"
                fullWidth
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={togglePasswordVisibility} size="small">
                      {passwordVisible ? <EyeOff size={15} /> : <Eye size={15} />}
                    </IconButton>
                  ),
                }}
              />
            </div>

            <Button
              variant="contained"
              // color="primary"
              style={{background:'#38BDF8' ,boxShadow:"none" , textTransform:'none'}}
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} />
                  &nbsp;Logging in...
                </>
              ) : (
                <>
                  Login &nbsp; <Send size={18} />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <span style={{ display: 'block', marginBottom:'10px',fontSize:'8px',  fontFamily:'monospace', opacity:'0.5', textAlign: 'center' }}>Beta Version | a.0.1</span>
      </Card>
{/* toast */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;

