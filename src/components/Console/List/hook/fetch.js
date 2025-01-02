import axios from 'axios';

export const _curry_ = async () => {
    const _x = process.env.REACT_APP_API_KEY;
  try {
    if (!_x) {
      throw new Error('Missing credentials');
    }

    // console.log('Custom header received from frontend:',);

    // Forward the GET request to the PHP backend
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch.php`, {
      headers: {
        // 'Content-Type': 'application/json',
        '0avd': _x, // Forward the header to the PHP backend
      },
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      console.error('Axios error during data fetch:', error.message);
      throw new Error(error.response?.data?.message || 'Data fetch failed. Please try again later.');
    }

    console.error('Unexpected error during data fetch:', error.message);
    throw new Error('An unexpected error occurred. Please try again later.');
  }
};
