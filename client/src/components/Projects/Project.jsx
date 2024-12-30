import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/tempData";
import useServerApi from "../../hooks/useServerApi";
import { deleteProject } from "../../redux/user";

const Project = ({ project }) => {
  const dispatch = useDispatch();
  const handleOpenProjectDetails = () => {
    dispatch(openModal({ modal: "projectDetails", data: project }));
  };
  const handleOpenProjectForm = () => {
    dispatch(openModal({ modal: "formProject", data: project }));
  };
  const [_, refresh] = useServerApi(
    { url: `auth/project/${project?.id}`, method: "DELETE" },
    { manual: true }
  );
  const handleDeleteProject = async () => {
    try {
      await refresh();
      dispatch(deleteProject({ deletedProject: project }));
      console.log("Project deleted");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid item xs={12} sm={12} md={6}>
      <Card elevation={2}>
        <CardHeader
          title={project.name}
          subheader={project.description}
          titleTypographyProps={{
            fontWeight: "bold",
            color: "primary.main",
          }}
          subheaderTypographyProps={{
            color: "text.secondary",
            fontSize: "small",
          }}
        />
        <CardActions>
          <Tooltip title='Afficher le projet'>
            <IconButton color='primary' onClick={handleOpenProjectDetails}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Modifier le projet'>
            <IconButton color='primary' onClick={handleOpenProjectForm}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Supprmimer le projet'>
            <IconButton color='error' onClick={handleDeleteProject}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Project;
