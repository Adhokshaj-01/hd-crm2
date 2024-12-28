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
} from "@mui/material";
import { Country, State, City } from "country-state-city";
import { Person } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import {BookUser, Home }from 'lucide-react'
import _register from "./hook/register";
import _verify from "./hook/verify";
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [mobnum, setMobnum] = useState('');
  const [phoneValidating, setPhoneValidating] = useState(false);
  const [phoneExists, setPhoneExists] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const { register, handleSubmit, setValue, reset } = useForm();
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

  // Load countries on mount
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);
  // phonenumber
  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    setMobnum(phone); // Update the mobile number state

    // Validate phone number if length is 10
    if (phone.length === 10) {
      validatePhoneNumber(phone);
    } else {
      setPhoneExists(false); // Reset if the phone number is not of valid length
    }
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
  const validatePhoneNumber = async () => {
    setPhoneValidating(true);
    setTimeout(() => {
      setPhoneExists(false);
      setPhoneValidating(false);
    }, 1000);
  };

  // Submit form
  const onSubmit = async (data) => {
    setLoading(true);
    try{
      const response = await _register(data);
      if(response.success){  
        setLoading(false);
        setOtpDialogOpen(true);
     }else {
      setSnackbar({
        open: true,
        message: `Registeration failed , ${response.message}`,
        severity: "error",
      });
     }
    }catch(e){
      console.log('_error_', e);
      setSnackbar({
        open: true,
        message: "An error occurred while adding. Please try again.",
        severity: "error",
      });
    }finally{
      setLoading(false);
    }
   
  };

  const handleOtpSubmit = async() => {
  //   setOtpDialogOpen(false);
  //   alert("OTP Verified!");
  //   reset();
  setLoading(true);
    try{
      const response = await _verify(otp,mobnum);
      if(response.success){  
        setLoading(false);
        setOtpDialogOpen(false);
        setSnackbar({
          open: true,
          message: `Registration Successful, Verification and registration are complete.`,
          severity: 'success',
        });
        reset();
        setOtp('');
        setMobnum('');

     }else {
      setSnackbar({
        open: true,
        message: `Registeration failed , ${response.message}`,
        severity: "error",
      });
     }
    }catch(e){
      console.log('_error_', e);
      setSnackbar({
        open: true,
        message: "An error occurred while verfying. Please try again.",
        severity: "error",
      });
    }finally{
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 650,
        mx: "auto",
        p: 3,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom color="primary" fontFamily={"serif"}>
      Enrollment
      </Typography>
      <Divider sx={{ mb: 3  }} color='skublue' />
      {/* <Typography variant="h7" display={'flex'}><Home/> &nbsp; Basic Information</Typography> */}
      <Grid item xs={12} mb={4}>
            <Typography variant="h7" display={'flex'}><BookUser />&nbsp;Basic Information</Typography>
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
              // onBlur={validatePhoneNumber}
              InputProps={{
                startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                // endAdornment: phoneValidating && (
                //   <InputAdornment position="end">
                //     <CircularProgress size={24} />
                //   </InputAdornment>
                // ),
              }}
              // error={phoneExists}
              // helperText={phoneExists ? "Phone number already registered" : ""}
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
            <Divider sx={{ my: 2 }} color='skublue' />
            <Typography variant="h7" display={'flex'}><Home/> &nbsp; Address Information</Typography>
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
            <Divider sx={{ my: 2 }} color='skublue' />
           
          </Grid>
          {/* Submit Button */}
          <Grid item xs={4}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading || phoneExists}
              sx={{textTransform:'none'}}
            >
              {loading ? <CircularProgress size={24} /> : "Register"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* OTP Dialog */}
      <Dialog open={otpDialogOpen} onClose={() => {}} 
         disableBackdropClick
         disableEscapeKeyDown
        //  sx={{  bgcolor: "background.paper",}}
         >
        
        <DialogTitle fontFamily={'serif'}>Verification</DialogTitle>
        <DialogContent  
         sx={{  bgcolor: "background.paper",}}
        >

          <Typography>Enter the OTP sent to your phone:</Typography>
          <TextField
            fullWidth
            placeholder="- - - -"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            inputProps={{ maxLength: 4, minLength:4 }}
            variant='standard'
            sx={{mt:3}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOtpSubmit} variant="contained">
            Verify
          </Button>
          <Button 
          // onClick={handleOtpSubmit} 
          variant='outlined'>
            Verify Later
          </Button>
        </DialogActions>
      </Dialog>
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
    </Box>
  );
};

export default RegisterPage;
