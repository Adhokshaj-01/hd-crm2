import axios from "axios";

const _verify = async(otp,mobnum) => {
    try {
        const apiUrl = `${process.env.REACT_APP_API_URL}otp.php`;
        const response = await axios.post(apiUrl,   { mobnum: mobnum, otp: otp }, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        return response.data; // Return the API response for further processing
      } catch (error) {
        console.error("Error during registration:", error);
        throw new Error("Registration failed. Please try again.");
      }
    }
export default _verify;