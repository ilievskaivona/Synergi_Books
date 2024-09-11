import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";

interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const style = {
  position: "absolute" as const,
  top: "50%" as const,
  left: "50%" as const,
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function ModalWrapper({
  open,
  onClose,
  children,
  title,
}: ModalWrapperProps) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ px: 1 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {title}
          </Typography>
          <Divider />
          <Box sx={{ p: 2 }}>{children}</Box>
        </Box>
      </Modal>
    </div>
  );
}
