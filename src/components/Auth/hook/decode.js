import { jwtDecode } from 'jwt-decode'; // Note the named import

function decode() {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.log('No authenticated');
      return null;
    }

    const decoded = jwtDecode(token); // Correct usage of jwtDecode
    return decoded;

  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

export default decode;
