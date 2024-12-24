import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import AddTaskButton from "./Tasks/AddTaskButton";

const CustomToolbar = () => {
  const { pathname } = useLocation();
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton
        slotProps={{
          tooltip: { title: "Selectionner des colonnes" },
        }}
      />
      <GridToolbarFilterButton
        slotProps={{
          tooltip: { title: "Appliquer un filtre" },
        }}
      />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Changer la densité" } }}
      />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Exporter" },
        }}
      />
      {pathname === "/auth/tasks" && <AddTaskButton />}
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
