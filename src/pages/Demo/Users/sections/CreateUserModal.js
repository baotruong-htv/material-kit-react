import * as React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Card, Stack, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  p: 4,
  backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 1),
  backdropFilter: "saturate(200%) blur(30px)",
  boxShadow: ({ boxShadows: { xxl } }) => xxl,
};

export default function CreateUserModal({ isOpen, onClose, onCreate }) {
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = Object.fromEntries(formData.entries());
    onCreate && onCreate(newUser);
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Create a new user
        </Typography>
        <MKBox id="modal-modal-description" sx={{ mt: 2 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField id="name" name="name" label="Name" required />
              <TextField id="email" name="email" label="Email" required />
              <TextField id="phone" name="phone" label="Phone" required />

              <MKButton variant="outlined" color="info" type="submit" startIcon={<Add />}>
                Create
              </MKButton>
            </Stack>
          </form>
        </MKBox>
      </Card>
    </Modal>
  );
}
