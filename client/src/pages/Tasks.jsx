import React, { useEffect, useRef } from "react";
import TodoList from "../components/ToDoList/ToDoList";
import useServerApi from "../hooks/useServerApi";
import { getTasks } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography } from "@mui/material";

const Tasks = () => {
  const [{ loading }, refresh] = useServerApi(
    { url: "/auth/tasks" },
    { manual: true }
  );
  const userId = useSelector((store) => store.user.id);
  const tasks = useSelector((store) => store.user.tasks || []);
  const dispatch = useDispatch();

  const requestRef = useRef("allowed");
  const fetchTasks = async () => {
    try {
      const response = await refresh({ params: { userId } });
      const tasks = response.data;
      dispatch(getTasks({ tasks }));
      requestRef.current = "allowed";
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (requestRef.current === "allowed") {
      requestRef.current = "denied";
      if (userId) {
        fetchTasks();
      }
    }
  }, [userId]);
  if (loading) return <Typography>Chargement...</Typography>;
  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' gutterBottom>
        Liste des tâches
      </Typography>
      <TodoList tasks={tasks} />
    </Container>
  );
};

export default Tasks;
