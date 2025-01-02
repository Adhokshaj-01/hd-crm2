import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, useTheme, LinearProgress, Chip } from "@mui/material";
import { Input, MenuItem, FormControl, InputLabel, Select as MuiSelect } from "@mui/material";
import { Avatar } from "@mui/material";
import Male from '../../../Images/user/male.png';
import Female from '../../../Images/user/female.png';
import { _curry_ } from "./hook/fetch";
import decode from "../../Auth/hook/decode";
import { extractPermissions } from "../../Auth/hook/permissions";
import { useNavigate } from "react-router-dom";

// Static Data

const TableWithCheckboxes = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ gender: "all", verified: "all" });
  const [usersData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state
  const [progress, setProgress] = useState(0);
  // access 
  const navigate =  useNavigate()
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
    // fetchData
  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching
    setProgress(10);
    try {

      const result = await _curry_();
      setUserData(result);
      setProgress(100);
    } catch (error) {
      console.log('Error while fetching', error.message);
      setProgress(100);
    } finally {
      setTimeout(() => {
      setLoading(false);
      },2000) // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle select all
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(usersData.map((user) => user.mobnum));
    } else {
      setSelectedUsers([]);
    }
  };

  // Handle user selection
  const handleSelectUser = (mobnum, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, mobnum]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== mobnum));
    }
  };

  // Apply search and filters
  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobnum.includes(searchTerm);

    const matchesGender =
      filters.gender === "all" || user.gender.toLowerCase() === filters.gender.toLowerCase();

    const matchesVerified =
      filters.verified === "all" ||
      (filters.verified === "verified" && user.verify === "1") ||
      (filters.verified === "not_verified" && user.verify === "0");

    return matchesSearch && matchesGender && matchesVerified;
  });

  const isAllSelected =
    filteredUsers.length > 0 && filteredUsers.length === selectedUsers.length;

  const formatDate = (dateString) => {
    if (!dateString) return "Not Provided";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatAddress = (user) => {
    const { street, area, city, state, country, pincode } = user;
    return (
      [street, area, city, state, country, pincode]
        .filter(Boolean)
        .join(", ") || "Not Provided"
    );
  };
if(!permission?.Customers?.access)
{
  navigate('/*')
}
  const theme = useTheme();
  return (
    <div className="p-4">
      <div
        className="flex gap-4 pb-4 sticky top-[0px] z-10"
        style={{
          borderBottom:
            theme.palette.mode === "dark" ? "1px solid #27272A" : "1px solid #E4E4E7",
        }}
      >
        {/* Search Box */}
        <div className="flex flex-col">
          <Input
            placeholder="Search by name or number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 w-full"
            fullWidth
          />
        </div>

        {/* Gender Filter */}
        <div className="flex flex-col">
          <FormControl variant="outlined" className="mb-4">
            <InputLabel>Gender</InputLabel>
            <MuiSelect
              size="small"
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              label="Gender"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </MuiSelect>
          </FormControl>
        </div>

        {/* Verification Filter */}
        <div className="flex flex-col">
          <FormControl variant="outlined" className="mb-4">
            <InputLabel>Verification Status</InputLabel>
            <MuiSelect
              size="small"
              value={filters.verified}
              onChange={(e) => setFilters({ ...filters, verified: e.target.value })}
              label="Verification Status"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="verified">Verified</MenuItem>
              <MenuItem value="not_verified">Not Verified</MenuItem>
            </MuiSelect>
          </FormControl>
        </div>
      </div>

      {/* Loader while data is being fetched */}
      {loading ? (
        // <div className="flex justify-center items-center">
         <LinearProgress
          variant="buffer"
          value={progress}
          valueBuffer={progress + 30} // Simulate a buffer effect
          sx={{ marginBottom: 8 }}
          color="success"
        />
        // </div>
      ) : (
        <TableContainer>
          <Table>
            <TableHead style={{ background: theme.palette.mode === "dark" ? '#121212' : '#f3f3f3' }}>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>DOA</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Married</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Verified</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.custid}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.mobnum)}
                      onChange={(e) => handleSelectUser(user.mobnum, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar src={user.gender === "male" ? Male : Female} />
                  </TableCell>
                  <TableCell>{user.fname} {user.lname}</TableCell>
                  <TableCell>{user.mobnum}</TableCell>
                  <TableCell>
                  {user.email || (
                        <span className="text-xs opacity-50 font-mono">
                          Not Provided
                        </span>
                      )}
                  </TableCell>
                  <TableCell>{formatDate(user.dob)}</TableCell>
                  <TableCell>
                  {formatDate(user.doa) === "Not Provided" ? (
                        <span className="text-xs opacity-50 font-mono">
                          Not Provided
                        </span>
                      ) : (
                        formatDate(user.doa)
                      )}
                  </TableCell>
                  <TableCell className="first-letter:uppercase">{user.gender}</TableCell>
                  <TableCell className="first-letter:uppercase">
                  {user.mstatus || (
                        <span className="text-xs opacity-50 font-mono">
                          Not Provided
                        </span>
                      )}
                  </TableCell>
                  <TableCell>{formatAddress(user)}</TableCell>
                  <TableCell>
                  <Chip label={user.verify === "1" ? "Verified" : "Not Verified"}color={user.verify === "1" ? "success":"error"} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TableWithCheckboxes;
