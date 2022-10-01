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
import { Formik } from "formik";

function App() {
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    email: "",
    gender: "",
    courses: "",
  });
  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://61fcdb8ff62e220017ce41c1.mockapi.io/users"
      );
      setUserData(response.data);
    }
    getData();
  }, []);
  const onPopulateData = (id) => {
    const selectedData = userData.filter((row) => row.id === id)[0];
    setFormData({ ...selectedData });
  };
  const handleDelete = async (id) => {
    const response = await axios.delete(
      `https://61fcdb8ff62e220017ce41c1.mockapi.io/users/${id}`
    );
    const unDeletedData = userData.filter((row) => row.id !== id);
    setUserData(unDeletedData);
  };
  const validateForm = (formDataToValidate) => {
    var error = {};
    if (formDataToValidate.name === "") error.name = "Name is Required";
    if (formDataToValidate.email === "") error.email = "Email is Required";
    if (formDataToValidate.age === "") error.age = "Age is Required";
    if (formDataToValidate.gender === "") error.gender = "Gender is Required";
    if (formDataToValidate.courses === "")
      error.courses = "Courses is Required";
    return error;
  };
  const handleSubmit = async (formSubmittedData, { resetForm }) => {
    if (formData.id) {
      // Update
      const response = await axios.put(
        `https://61fcdb8ff62e220017ce41c1.mockapi.io/users/${formData.id}`,
        { ...formSubmittedData }
      );
      let user = [...userData];
      let index = userData.findIndex((row) => row.id === formData.id);
      user[index] = response.data;
      setUserData(user);
      resetForm();
    } else {
      // Create
      const response = await axios.post(
        "https://61fcdb8ff62e220017ce41c1.mockapi.io/users",
        { ...formSubmittedData }
      );
      setUserData([...userData, response.data]);
      resetForm();
    }
  };
  return (
    <div style={{ padding: "10px" }}>
      <h3>User Form</h3>
      <Formik
        initialValues={formData}
        validate={validateForm}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm,
          /* and other goodies */
        }) => (
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>{touched.name && errors.name}</span>
            <br />
            <TextField
              type="number"
              id="age"
              label="Age"
              variant="outlined"
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>{touched.age && errors.age}</span>
            <br />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>
              {touched.email && errors.email}
            </span>
            <br />
            {/* Gender */}
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="gender"
                id="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <span style={{ color: "red" }}>
              {touched.gender && errors.gender}
            </span>
            <br />
            <FormControl fullWidth>
              <InputLabel id="label-courses">Courses</InputLabel>
              <Select
                labelId="label-courses"
                id="courses"
                name="courses"
                label="Courses"
                value={values.courses}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"React JS"}>React JS</MenuItem>
                <MenuItem value={"Node JS"}>Node JS</MenuItem>
                <MenuItem value={"MySQL"}>MySQL</MenuItem>
              </Select>
            </FormControl>
            <br />
            <span style={{ color: "red" }}>
              {touched.courses && errors.courses}
            </span>
            <br />
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Save
            </Button>
            <Button variant="contained" onClick={resetForm}>
              Reset
            </Button>
          </Box>
        )}
      </Formik>

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
                  <Button variant="text" onClick={() => onPopulateData(row.id)}>
                    Edit
                  </Button>
                  <Button variant="text" onClick={() => handleDelete(row.id)}>
                    Delete
                  </Button>
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
