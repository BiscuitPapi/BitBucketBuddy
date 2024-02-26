import React from 'react';
import { Button, TableHead, TableRow, TableCell, TableBody, Table, Container, Paper, TableContainer, Tooltip } from '@mui/material';
import NewProjectModal from './NewProject';

function ProjectList({ projects }) {
  // State for modal visibility
  const [showModal, setShowModal] = React.useState(false);

  // Function to handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container maxWidth='xl'>
      <div style={{ height: 450, width: '100%', margin: '0 auto', marginTop: '20px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>#</TableCell>
                <TableCell align='left'>Title</TableCell>
                <TableCell align='center'>Status</TableCell>
                <TableCell align='center'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell align='left'>{project.title}</TableCell>
                  <TableCell align='center'>
                    {/* Your status indicator */}
                  </TableCell>
                  <TableCell align='center'>
                    {/* Your delete button */}
                  </TableCell>
                </TableRow>
              ))}
              {(projects.length === 0) && (
                <TableRow style={{ height: 53 }}>
                  <TableCell colSpan={4} align='center'>No projects found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* Render the NewProjectModal */}
      <NewProjectModal open={showModal} handleClose={handleCloseModal} />
    </Container>
  );
}

export default ProjectList;
