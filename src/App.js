import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // API Call
    async function getData() {
      const response = await axios.get(
        "https://61fcdb8ff62e220017ce41c1.mockapi.io/users"
      );
      setUserData(response.data);
    }
    getData();
  }, []);
  return (
    <div style={{ padding: "10px" }}>
      <h3>User Form</h3>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="name" label="Name" variant="outlined" /> <br />
        <TextField type="number" id="age" label="Age" variant="outlined" />{" "}
        <br />
        <TextField id="email" label="Email" variant="outlined" /> <br />
        {/* Gender */}
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="gender"
            id="gender"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <br />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Courses</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="courses"
            name="courses"
            label="Courses"
          >
            <MenuItem value={"React JS"}>React JS</MenuItem>
            <MenuItem value={"Node JS"}>Node JS</MenuItem>
            <MenuItem value={"MySQL"}>MySQL</MenuItem>
          </Select>
        </FormControl>{" "}
        <br /> <br />
        <Button variant="contained" type="submit">
          Save
        </Button>
        <Button variant="contained">Reset</Button>
      </Box>

      <h3>User Data</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Courses</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.courses}</TableCell>
                <TableCell>
                  <Button variant="text">Edit</Button>
                  <Button variant="text">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
