import React, { useState, useEffect } from "react";
import {
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Container,
  Paper,
  TableContainer,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  InputLabel,
  Typography,
  Link,
} from "@mui/material";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../Components/NavBar/NavigationBar";

function ProjectList({ projects: initialProjects, token }) {
  const [projects, setProjects] = useState([]);
  const bearerToken = process.env.REACT_APP_BITBUCKET_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://stash.guidewire.com/rest/api/1.0/projects/",
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data.values);
        console.log("Projects fetched successfully:", data.values); // Log the fetched projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [bearerToken]);

  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  console.log(token);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {" "}
      {/* or React.Fragment */}
      <NavigationBar />
      <Container maxWidth="xl">
        <div
          style={{
            height: 450,
            width: "100%",
            margin: "0 auto",
            marginTop: "20px",
          }}
        >
          <Button
            sx={{
              marginTop: "3px",
              marginBottom: "10px",
              width: "10%",
              backgroundColor: "#2E3646",
              color: "white", // Set text color to white
              "&:hover": {
                backgroundColor: "#1e2431",
              },
            }}
            onClick={handleOpen} // Open the modal when clicked
          >
            Add Project
          </Button>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">#</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">{project.title}</TableCell>
                    <TableCell align="center">
                      {/* Your status indicator */}
                    </TableCell>
                    <TableCell align="center">
                      {/* Your delete button */}
                    </TableCell>
                  </TableRow>
                ))}
                {projects.length === 0 && (
                  <TableRow style={{ height: 53 }}>
                    <TableCell colSpan={4} align="center">
                      No projects found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Modal */}
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "40vw", // Set the maximum width to 40% of the viewport width
              width: "100%", // Ensure the modal takes up the entire width of its container
            },
          }}
        >
          <DialogTitle>
            <b>Add New Project</b>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2} textAlign="right">
                <InputLabel htmlFor="title" margin="dense">
                  <Typography variant="h1" style={{ fontSize: "15px" }}>
                    Project Key
                  </Typography>
                </InputLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  hiddenLabel
                  autoFocus
                  margin="dense"
                  type="text"
                  variant="outlined"
                  style={{ width: "50%" }}
                  size="small"
                />
              </Grid>
              <Grid item xs={2} textAlign="right">
                <InputLabel htmlFor="description">
                  <Typography variant="h1" style={{ fontSize: "15px" }}>
                    Preview
                  </Typography>
                </InputLabel>
              </Grid>
              <Grid item xs={10}>
                <Link
                  href={`https://${process.env.REACT_APP_BITBUCKET}/projects/`}
                >
                  {`https://${process.env.REACT_APP_BITBUCKET}/projects/`}
                </Link>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button className="buttonPrimary" onClick={handleClose}>
              Add Project
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default ProjectList;
