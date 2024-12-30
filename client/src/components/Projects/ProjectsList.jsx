import { Button, Grid } from "@mui/material";
import React from "react";
import Project from "./Project";
import ProjectDetails from "./ProjectDetails";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/tempData";
import FormProject from "./FormProject";

const ProjectsList = () => {
  const projects = useSelector((store) => store.user.projects || []);
  const dispatch = useDispatch();
  return (
    <>
      <ProjectDetails />
      <FormProject />
      <Button
        startIcon={<PostAddIcon />}
        variant='contained'
        sx={{ mb: 2 }}
        onClick={() =>
          dispatch(openModal({ modal: "formProject", data: null }))
        }>
        Créer un nouveau projet
      </Button>
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Project key={project.name} project={project} />
        ))}
      </Grid>
    </>
  );
};

export default ProjectsList;
