import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useServerApi from "../../../hooks/useServerApi";
import { getTasks } from "../../../redux/user";
import RenderDataGrid from "../RenderDataGrid";
import { columns } from "./columns";

const priorityMapping = { low: "Basse", medium: "Moyenne", high: "Haute" };

export default function TasksDataGrid() {
  const rows = useSelector((store) => store.user?.tasks || []);
  const renderRows = useMemo(() => {
    return rows.map((task) => ({
      ...task,
      priority: priorityMapping[task.priority],
    }));
  }, [rows]);

  const userId = useSelector((store) => store.user.id);

  const dispatch = useDispatch();
  const requestRef = useRef("allowed");

  const [{ loading }, refresh] = useServerApi(
    { url: "/auth/tasks" },
    { manual: true }
  );

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

  return (
    <RenderDataGrid rows={renderRows} columns={columns} loading={loading} />
  );
}
