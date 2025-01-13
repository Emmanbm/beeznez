import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import InviteUser from "./Users/InviteUser";

const CustomToolbar = () => {
  const { pathname } = useLocation();
  return (
    <GridToolbarContainer sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
      {["/auth/employees", "/auth/users"].includes(pathname) && <InviteUser />}
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
