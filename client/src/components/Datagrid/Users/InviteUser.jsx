import React, { useMemo, useState } from "react";
import { Button, Tooltip, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";

const initialTitle = "Copier le code";

const InviteUser = () => {
  const { role, invitationCode } = useSelector((store) => store.user || {});
  const [title, setTitle] = useState(initialTitle);
  const copied = useMemo(() => {
    return title === "Copié";
  }, [title]);
  const handleCopyCode = () => {
    navigator.clipboard.writeText(invitationCode);
    setTitle("Copié");
    setTimeout(() => {
      setTitle(initialTitle);
    }, 5000);
  };
  return (
    <Tooltip
      arrow
      title={
        <>
          <Typography fontSize='small' textAlign='center'>
            {role === "admin"
              ? "Invitez un développeur à collaborer sur le site."
              : "Invitez des employés et collaborateurs."}
          </Typography>
          {invitationCode && (
            <>
              <Typography fontSize='small' textAlign='center'>
                Cliquez pour copier le code d'invitation :
              </Typography>
              <Typography fontSize='small' fontWeight={600} textAlign='center'>
                {invitationCode}
              </Typography>
            </>
          )}
        </>
      }>
      <Button
        variant='outlined'
        disabled={!invitationCode}
        color={copied ? "success" : "primary"}
        startIcon={copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
        size='small'
        onClick={handleCopyCode}>
        {title}
      </Button>
    </Tooltip>
  );
};

export default InviteUser;
