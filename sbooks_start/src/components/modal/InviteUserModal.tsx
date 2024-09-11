import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Modal,
  SelectChangeEvent,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import Profile from "../../assets/icons/Profile-login.svg";
import fi_x from "../../assets/icons/fi_x.svg";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import { toErrorMap } from "../../utils/toErrorMap";
import { Select } from "../../components/Select";
import { User } from "../../types/User";

interface InviteUserModalProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  onUserCreated: (newUser: any) => void; // Callback function
}

const InviteUserModal: React.FC<InviteUserModalProps> = ({
  modalOpen,
  setModalOpen,
  onUserCreated,
}) => {
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState<string | number>("Admin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleCloseSnackbar = (
    event: React.SyntheticEvent<Element, Event>,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: SelectChangeEvent<typeof role>) => {
    setRole(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleInvite = async (name,email,role) => {
    try {
      return await axios.post(
        "http://0.0.0.0:3740/v1/user",
        {
          name: name,
          email: email,
          role: role,
        },
        {
          headers: {
            "x-api-key": "test",
          },
        }
      );
    } catch (error) {
      if (error.response && error.response.data) {
        // Server responded with an error message
        console.error("Server error:", error.response.data);
      } else {
        // Something else went wrong
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <Modal
      open={modalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
        }}
      >
         <Formik
                initialValues={{
                  name: "",
                  email:  "",
                  role: "Admin"
                 }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await handleInvite(
                   values.name,
                   values.email,
                   values.role
                );
                
                if (response.data.errors) {
                  setErrors(toErrorMap(response.data.errors));
                  console.log(response.data.errors)
                } else {
                  const newUser: any = response.data;
                  setModalOpen(false);
                 onUserCreated(newUser);
                }
              }}
            >
                  {({ isSubmitting }) => (
            <Form>
          <div
          style={{
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "150%",
            zIndex: 9999,
          }}
        >
          <Snackbar
            open={!!errorMessage}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleCloseSnackbar}
              severity="error"
            >
              {errorMessage}
            </MuiAlert>
          </Snackbar>
        </div>
        <Box
          sx={{
            display: "flex",
            bgcolor: "white",
            borderRadius: "8px",
            border: "1px solid #EAECF0",
            boxShadow: 24,
            flexDirection: "column",
            p: 4,
          }}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "12px",
            }}
          >
            <Typography variant="h5sSemiBold" sx={{ display: "flex" }}>
              Invite users
            </Typography>
            <Typography onClick={() => setModalOpen(false)}>
              <Button>
                <img src={fi_x} alt="fix" />
              </Button>
            </Typography>
          </Grid>

          <Typography
            variant="p3Medium"
            display={"flex"}
            sx={{ paddingBottom: "32px", color: "neutral500" }}
          >
            These information will setup the account automatically.
          </Typography>
            <InputField 
             fieldLabel="Name"
              errorClass={{
                          marginTop: "-32px",
                          marginBottom: "32px",
                     }}
          
                required
                id="name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={Profile} alt="profile" />
                    </InputAdornment>
                  ),
                  sx: {
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    color: "neutral500",
                    fontWeight: "400",
                    lineHeight: "24px",
                    letterSpacing: "-0.08px",
                    borderRadius: "8px",
                  },
                  placeholder: "Name",
                }}
                fullWidth
                name="name"
                value={name}
                sx={{ paddingBottom: "32px" }}
              />
         
              <InputField
              fieldLabel="Email address"
                        errorClass={{
                          marginTop: "-32px",
                          marginBottom: "32px",
                        }}
                required
                id="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={Profile} alt="profile" />
                    </InputAdornment>
                  ),
                  sx: {
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    color: "neutral500",
                    fontWeight: "400",
                    lineHeight: "24px",
                    letterSpacing: "-0.08px",
                    borderRadius: "8px",
                  },
                  placeholder: "Email address",
                }}
                fullWidth
                name="email"
                value={email}
                sx={{ paddingBottom: "32px" }}
              />
            <Select
                        fieldLabel="Add role"
                        id="role"
                        name="role"
                        initialValue="Editor"
                        sx={{ borderRadius: "8px" }}
                      >
                        <MenuItem value={"Editor"}>Editor</MenuItem>
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                        <MenuItem value={"Approver"}>Approver</MenuItem>
              </Select>
          <Grid sx={{ paddingTop: "32px" }}>
           {isSubmitting ? (
                          <Grid
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <CircularProgress />
                          </Grid>
                        ) : (
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{
                              textTransform: "none",
                              padding: "10px 20px",
                              backgroundColor: "primary600",
                            }}
                            type="submit"
                          >
                            <Typography variant="p2Medium" color="white">
                              Save changes
                            </Typography>
                          </Button>
                        )}
          </Grid>
        </Box>
        </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default InviteUserModal;
