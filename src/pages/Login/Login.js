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
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Login({ setToken }) {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const signIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      console.log("Signed in successfully:", data);
      setNotificationSeverity("success");
      setNotificationMessage("Signed in successfully!");
      setNotificationOpen(true);
      console.log(data);
      // Store token in localStorage
      localStorage.setItem("token", JSON.stringify(data));

      navigate("/project");
    } catch (error) {
      console.error("Error signing in:", error.message);
      setNotificationSeverity("error");
      setNotificationMessage("Error signing in: " + error.message);
      setNotificationOpen(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
              Login
            </Typography>
            <Box sx={styles.box3}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
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
                autoComplete="current-password"
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
              <Button
                onClick={signIn}
                sx={{
                  marginTop: "3px",
                  marginBottom: "1px",
                  width: "70%",
                  backgroundColor: "#2E3646",
                  color: "white", // Set text color to white
                  "&:hover": {
                    backgroundColor: "#1e2431",
                  },
                }}
              >
                Login
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
