import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { actions } from "./actions";

export default function Actions({ user }) {
  return (
    <>
      {actions(user).map((action) => (
        <Accordion key={action.id} defaultExpanded={action.defaultExpanded}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={action.ariaControls}
            id={action.id}>
            <Typography component='span'>{action.title}</Typography>
          </AccordionSummary>
          {action.children}
        </Accordion>
      ))}
    </>
  );
}
