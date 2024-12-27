import axios from 'axios';

// Function to handle authentication
const _auth = async (email, password) => {
  try {
    // Validate that email and password are provided
    if (!email || !password) {
      return {
        status: 'error',
        message: 'Missing credentials.',
      };
    }

    // Make the API call to login endpoint
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}login.php`, // Assuming this is your backend URL
      { email, password },
      {headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }}
    );

    // Check if login was successful
    if (response.data.status === 'success') {
      const authToken = response.data.auth_token;

      // If auth_token is not present, return an error
      if (!authToken) {
        return {
          status: 'error',
          message: 'Authentication token missing in backend response.',
        };
      }

      // Store the token in localStorage
      localStorage.setItem('auth_token', authToken);

      return {
        status: 'success',
        message: 'Login successful!',
        auth_token: authToken,
      };
    } else {
      // If the backend returned a failure response
      return {
        status: 'error',
        message: response.data.message || 'Login failed.',
      };
    }
  } catch (error) {
    // Handle network errors or API request failures
    if (axios.isAxiosError(error)) {
      console.error('Axios error during login:', error.message);
      return {
        status: 'error',
        message: error.response?.data?.message || 'Login failed. Please try again later.',
      };
    }

    // Handle unexpected errors
    console.error('Unexpected error during login:', error.message);
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
};

export default _auth;
