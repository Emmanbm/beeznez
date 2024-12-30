import { Container, Typography } from "@mui/material";
import React from "react";
import ProjectsList from "../components/Projects/ProjectsList";

const Projects = () => {
  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' gutterBottom>
        Liste des projets
      </Typography>
      <ProjectsList />
    </Container>
  );
};

export default Projects;
