import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Snackbar,
  Alert,
  useTheme,
  Slide,
} from "@mui/material";
import { Country, State, City } from "country-state-city";
import { Person } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { BookUser, Home } from "lucide-react";
import _register from "./hook/register";
import _verify from "./hook/verify";
import GridPattern from "../../../ui/GridPattern";
import {  useNavigate } from "react-router-dom";
//
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
//
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [mobnum, setMobnum] = useState("");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, reset } = useForm();
  const random = '4"a$]~@#/vmUg=6F,7VGX*9+(B!~F<J5Ams[1%Z/PyDqNczQpEQXHH`U~*X0CQ>j';
  //
  const theme = useTheme();
  // toast
  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };
  //
  // Country, State, and City Management
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);
  // phonenumber
  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    setMobnum(phone); // Update the mobile number state
  };
  //

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setStates(State.getStatesOfCountry(countryCode));
    setCities([]);
    setValue("country", countryCode);
  };

  const handleStateChange = (event) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);
    setCities(City.getCitiesOfState(selectedCountry, stateCode));
    setValue("state", stateCode);
  };

  const handleCityChange = (event) => {
    setValue("city", event.target.value);
  };

  // Simulated Phone Validation

  // Submit form
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await _register(data);
      if (response.success) {
        setLoading(false);
       setOtpDialogOpen(true);
        } else {
          setSnackbar({
            open: true,
            message: `Registeration failed , ${response.message}`,
            severity: "error",
          });
        }
      } catch (e) {
        console.log("_error_", e);
        setSnackbar({
          open: true,
          message: "An error occurred while adding. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      const response = await _verify(otp, mobnum);
      if (response.success) {
        setLoading(false);
        setOtpDialogOpen(false);
        setSnackbar({
          open: true,
          message: `Registration Successful, Verification and registration are complete.`,
          severity: "success",
        });
        reset();
        setOtp("");
        setMobnum("");
        navigate(`console/success/${random}`);
      } else {
        setSnackbar({
          open: true,
          message: `Registeration failed , ${response.message}`,
          severity: "error",
        });
      }
    } catch (e) {
      console.log("_error_", e);
      setSnackbar({
        open: true,
        message: "An error occurred while verfying. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[fit-content]">
      <GridPattern
        width={150}
        height={90}
        className="absolute inset-0 mask-image-[radial-gradient(500px_circle_at_center,_white,_transparent)] inset-x-0 inset-y-[-0%] h-[full]"
      />
      <Box
        sx={{
          maxWidth: 650,
          mx: "auto",
          p: 3,
          background: theme.palette.mode === "dark" ? "#09090B" : "white",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 10px 15px -3px rgb(18, 18, 18), 0 4px 6px -4px rgb(10, 10, 10)"
              : 3,
          borderRadius: 2,
          border: theme.palette.mode === "dark" ? "1px solid #27272A" : "",
          // zIndex:10
        }}
        className="z-10"
      >
        <Typography
          variant="h6"
          gutterBottom
          color="primary"
          fontFamily={"serif"}
        >
          Enrollment
        </Typography>
        <Divider sx={{ mb: 3 }} color="skublue" />
        {/* <Typography variant="h7" display={'flex'}><Home/> &nbsp; Basic Information</Typography> */}
        <Grid item xs={12} mb={4}>
          <Typography variant="h7" display={"flex"}>
            <BookUser />
            &nbsp;Basic Information
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Phone Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                {...register("phone", { required: true })}
                onChange={handlePhoneChange}
                inputProps={{ maxLength: 10, minLength: 10 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
                required
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                type="email"
              />
            </Grid>

            {/* Name Fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                {...register("fname", { required: true })}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                {...register("lname", { required: true })}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Date Fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date of Birth"
                {...register("dob", { required: true })}
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                  "& .MuiSvgIcon-root": {
                    color:
                      theme.palette.mode === "dark" ? "#ffffff" : "#000000", // Icon color based on theme
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date of Anniversary"
                {...register("doa")}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Gender and Marital Status */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select {...register("gender", { required: true })}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Marital Status</InputLabel>
                <Select {...register("mS")}>
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Address Details */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} color="skublue" />
              <Typography variant="h7" display={"flex"}>
                <Home /> &nbsp; Address Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Street Number"
                {...register("street", { required: true })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Area"
                {...register("area", { required: true })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Country"
                fullWidth
                value={selectedCountry}
                onChange={handleCountryChange}
                required
              >
                {countries.map((country) => (
                  <MenuItem key={country.isoCode} value={country.isoCode}>
                    {country.name} - {country.flag}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="State"
                fullWidth
                value={selectedState}
                onChange={handleStateChange}
                disabled={!selectedCountry}
                required
              >
                {states.map((state) => (
                  <MenuItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="City"
                fullWidth
                onChange={handleCityChange}
                disabled={!selectedState}
                required
              >
                {cities.map((city) => (
                  <MenuItem key={city.name} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode"
                {...register("pincode", { required: true })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} color="skublue" />
            </Grid>
            {/* Submit Button */}
            <Grid item xs={4}>
              <Button
                type="submit"
                // onClick={() => {
                //   setOtpDialogOpen(true);
                // }}
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ textTransform: "none" }}
              >
                {loading ? <CircularProgress size={24} /> : "Register"}
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* OTP Dialog */}
        <Dialog
          open={otpDialogOpen}
          onClose={() => {}}
           disableBackdropClick
           disableEscapeKeyDown
          //  maxWidth='lg'
          PaperProps={{
            sx: {
              background: theme.palette.mode === "dark" ? "BLACK" : "white",
              color: theme.palette.mode === "dark" ? "WHITE" : "BLACK",
              borderRadius: "25PX",
              padding: "15px",
              borderBottom:
                theme.palette.mode === "dark"
                  ? "1px solid white"
                  : "4px solid black",
              borderLeft:
                theme.palette.mode === "dark"
                  ? "1px solid white"
                  : "4px solid black",
            },
          }}
          TransitionComponent={Transition}
        >
          <DialogTitle fontFamily={"serif"}>Verification</DialogTitle>
          <Divider />
          <DialogContent>
            <Typography>Enter the OTP sent to your phone:</Typography>
            <TextField
              fullWidth
              placeholder="- - - -"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              inputProps={{
                maxLength: 4,
                minLength: 4,
                style: { textAlign: "center", fontFamily: "monospace" }, // Center text and set monospace font
              }}
              variant="standard"
              sx={{
                mt: 3,
                "& .MuiInputBase-input": {
                  textAlign: "center", // Ensures text is centered
                  fontFamily: "monospace",
                  fontSize:'28px',
                  letterSpacing:4 // Apply monospace font
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleOtpSubmit}
              variant="contained"
              sx={{
                fontSize: "small",
                background: theme.palette.mode === "dark" ? "white" : "#09090B",
                fontFamily: "serif",
              }}
            >
              Verify
            </Button>
            <Button
              onClick={()=>{
        navigate(`/console/success/${random}`);

              }}
              variant="outlined"
              sx={{
                border: "none",
                fontSize: "small",
                textTransform: "none",
                color: theme.palette.mode === "dark" ? "WHITE" : "BLACK", // Text color
                ml: 4,
              }}
            >
              Verify Later
            </Button>
          </DialogActions>
        </Dialog>
        {/* toast */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default RegisterPage;
