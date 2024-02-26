import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import styles from "./styles";
import { supabase } from "../../lib/helper/supabaseClient";

const theme = createTheme();

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [emptyFields, setEmptyFields] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const signUp = async () => {
    try {
      // Check if any field is empty
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setEmptyFields({
          fullName: !formData.fullName,
          email: !formData.email,
          password: !formData.password,
          confirmPassword: !formData.confirmPassword,
        });
        return;
      }

      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        setPasswordMismatch(true);
        return;
      }

      const { user, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
      });

      if (error) {
        if (
          error.message.includes(
            "duplicate key value violates unique constraint"
          )
        ) {
          throw new Error("Email already in use");
        }
        throw error;
      }

      // Update user metadata with full name
      const { data, error: metadataError } = await supabase
        .from("users")
        .update({ full_name: formData.fullName })
        .eq("id", user.id);

      if (metadataError) {
        // Handle metadata update error
        throw metadataError;
      }

      console.log("Signed up successfully:", user);
      setNotificationSeverity("success");
      setNotificationMessage(
        "Signed up successfully! Please check your email for verification."
      );
      setNotificationOpen(true);
      setPasswordMismatch(false);
      setEmptyFields({
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false,
      });
    } catch (error) {
      console.error("Error signing up:", error.message);
      setNotificationSeverity("error");
      setNotificationMessage("Error signing up: " + error.message);
      setNotificationOpen(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setPasswordMismatch(false);
    setEmptyFields({ ...emptyFields, [name]: false });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <Box sx={styles.box}>
          <PlaylistAddCheckIcon sx={styles.logo} fontSize="large" />
          <Typography variant="h4" noWrap sx={styles.logoTitle}>
            ZDD
          </Typography>
          <Typography variant="h7" noWrap sx={styles.titleSmall}>
            checklist
          </Typography>
        </Box>
        <CssBaseline />
        <Box sx={styles.outerBox}>
          <Box sx={StyleSheet.box2}>
            <Typography component="h1" variant="h4" sx={styles.title}>
              Register
            </Typography>
            <Box sx={styles.box3}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="fullName"
                autoFocus
                error={emptyFields.fullName}
                helperText={
                  emptyFields.fullName ? "Full name cannot be empty" : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
                value={formData.fullName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                error={emptyFields.email}
                helperText={emptyFields.email ? "Email cannot be empty" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
                value={formData.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={emptyFields.password || passwordMismatch}
                helperText={
                  emptyFields.password
                    ? "Password cannot be empty"
                    : passwordMismatch
                    ? "Passwords do not match"
                    : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
                value={formData.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                error={emptyFields.confirmPassword || passwordMismatch}
                helperText={
                  emptyFields.confirmPassword
                    ? "Confirm Password cannot be empty"
                    : passwordMismatch
                    ? "Passwords do not match"
                    : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
                value={formData.confirmPassword}
              />
              <Button
                onClick={signUp}
                sx={{
                  marginTop: "3px",
                  marginBottom: "1px",
                  width: "70%",
                  backgroundColor: "#2E3646",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1e2431",
                  },
                }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>
        <Snackbar
          open={notificationOpen}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
        >
          <MuiAlert
            onClose={handleCloseNotification}
            severity={notificationSeverity}
            sx={{ width: "100%" }}
          >
            {notificationMessage}
          </MuiAlert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
