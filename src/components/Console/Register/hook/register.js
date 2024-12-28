import axios from "axios";

const _register = async (data) => {
    try {
        const apiUrl = `${process.env.REACT_APP_API_URL}add.php`;
        const response = await axios.post(apiUrl, data, {
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
export default _register;
