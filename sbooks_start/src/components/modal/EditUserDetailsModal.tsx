import {
    Box,
    Button,
    Grid,
    InputAdornment,
    MenuItem,
    Modal,
    Typography,
    CircularProgress,
  } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import Profile from "../../assets/icons/Profile-login.svg";
import fi_x from "../../assets/icons/fi_x.svg";
import Axios from 'axios'
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import { toErrorMap } from "../../utils/toErrorMap";
import { Select } from "../../components/Select";
import { User } from "../../types/User";


interface EditUserDetailsModalProps {
    modalOpenEditUserDetails: boolean;
    setModalOpenEditUserDetails: Dispatch<SetStateAction<boolean>>,
    user:User,
    users: User[],
    setUsers: Dispatch<SetStateAction<User[]>>;
    closeMenu:any    
}

const EditUserDetailsModal: React.FC<EditUserDetailsModalProps> = ({
    modalOpenEditUserDetails, 
    setModalOpenEditUserDetails,
    user,
    users,
    setUsers,
    closeMenu,
}) => {
    const updateUser = async(name, email, role) => {
    try {
      return await Axios.put(`http://0.0.0.0:3740/v1/editUser/${user.DBUserId}`, {
        name: name,
        email: email,
        role: role,
        user: 1,
        status:user.status
      } ,{
        headers: {
          "x-api-key": "test" 
        }
      });
    } catch (error) {
      console.error("Error editing user:", error);
    }
}  
    return(
        <div>
        <Modal
            open={modalOpenEditUserDetails}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box  sx={{
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    top: "50%",
                    left: "50%",
                    width: "484px",
            }}>
          {user ? (
              <Formik
                initialValues={{
                  name: user.name,
                  email: user.email,
                  role: user.role,
                 }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await updateUser(
                   values.name,
                  values.email,
                   values.role
                );
                
                if (response.data.errors) {
                  setErrors(toErrorMap(response.data.errors));
                  console.log(response.data.errors)
                } else {
                  setUsers(
                    users.map((u) =>
                      u.DBUserId === user.DBUserId
                        ? { ...response.data.user, status:user.status }
                        : u
                    )
                  );
                   setModalOpenEditUserDetails(false)
                   closeMenu()
                }
              }}
            >
                  {({ isSubmitting }) => (
                <Form>
                <Box sx={{
                    display: "flex",
                    bgcolor: "white",
                    borderRadius: "8px",
                    border: "1px solid #EAECF0",
                    boxShadow: 24,
                    flexDirection: "column",
                    p: 4,
                }}>
                    <Box display={"grid"}>
                    <Grid container justifyContent={"space-between"}>
                    <Typography
                        variant="h5sSemiBold"
                        sx={{ display: "flex", paddingBottom: "12px" }}
                          >
                        Edit {user.name}
                     </Typography>
                     <Button onClick={() => {
                      setModalOpenEditUserDetails(false)
                      closeMenu()
                     }}>
                        <img alt="" src={fi_x}></img>
                     </Button>
                    </Grid>
                    <Typography
                        variant="p3Medium"
                        display={"flex"}
                        sx={{ paddingBottom: "32px", color: "neutral500" }}
                        >
                        You can edit information for this user.
                        </Typography>
            
                        <InputField
                        fieldLabel="Name"
                         errorClass={{
                          marginTop: "-32px",
                          marginBottom: "32px",
                        }}
                         required
                          id="name"
                          type="name"
                          InputProps={{
                              startAdornment: (
                                  <InputAdornment position="start">
                                      <img alt="" src={Profile}/>
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
                            }}
                            fullWidth
                            name="name"
                            value={user.name}
                            sx={{ paddingBottom: "24px" }}
                            >
                            </InputField>
                          
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
                                    <img alt="" src={Profile}/>
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
                          }}
                          fullWidth
                          name="email"
                          value={user.email}
                          sx={{ paddingBottom: "24px" }}
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
                  </Box>
                </Form>
               )}
              </Formik>
          ): null }
            </Box>
         </Modal>
        </div>
    )
}
export default EditUserDetailsModal;