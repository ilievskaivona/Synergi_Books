import { Box, Button, Grid, Modal, Stack, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import fi_x from "../../assets/icons/fi_x.svg";
import Axios from 'axios'
import { User, UserStatus } from "../../types/User";

interface InviteUserModalProps {
    modalOpenInactiveUser: boolean;
    setModalOpenInactiveUser: Dispatch<SetStateAction<boolean>>;
    user:User,
    setUsers: Dispatch<SetStateAction<User[]>>; 
    closeMenu: any
}

const InactiveUserModal: React.FC<InviteUserModalProps> = ({
    modalOpenInactiveUser,
    setModalOpenInactiveUser,
    user,
    setUsers,
    closeMenu
}) => {

    const deactivateUser = async (status) => {
      const requestBody = {
      name: user.name,
      password: user.password,
      email: user.email,
      role: user.role,
      status: status,
      user: user
    };
    try {
      const response = await Axios.put(`http://0.0.0.0:3740/v1/deactivate/${user.DBUserId}`, requestBody ,{
        headers: {
          "x-api-key": "test" 
        }
      });
      console.log("User deactivated successfully", response.data);
        setUsers(users=>users.map(u => {
      if (u.DBUserId === user.DBUserId) {
        return { ...u, status: status} ;
      }
      return u;
    }))
     
     setModalOpenInactiveUser(false)

    } catch (error) {
    
      console.error("Error deactivated:", error);
    }
}
    // console.log("User", user.status)
    return (
        <Modal open={modalOpenInactiveUser}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {user ? (<Box sx={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
                width: "484px",
            }}>

                <Box sx={{
                    display: "flex",
                    bgcolor: "white",
                    borderRadius: "8px",
                    border: "1px solid #EAECF0",
                    boxShadow: 24,
                    flexDirection: "column",
                    p: 4,
                }}>

                    <Grid sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "12px",
                    }}>

                        <Grid container>
                            <Grid container justifyContent={"space-between"}>
                                <Typography
                                    variant="h5sSemiBold"
                                    sx={{paddingBottom: "12px"}}>
                                        Make user {user.status === UserStatus.INACTIVE ? 'active' :
                                                   user.status === UserStatus.ACTIVE ? 'inactive' : 'inactive'}
                                                
                                </Typography>
                                <Typography>
                                    <Button onClick={() => {setModalOpenInactiveUser(false)
                                    closeMenu()}}>
                                        <img alt="" src={fi_x} />
                                    </Button>
                                </Typography>
                            </Grid>
                            <Typography variant="p3Medium" sx={{ color: "neutral500" }}>
                                Are you sure you want to make this user {user.status === UserStatus.INACTIVE ? 'active' :
                                                                         user.status === UserStatus.ACTIVE ? 'inactive' : 'inactive'} ?
                            </Typography>
                        </Grid>
                    </Grid>

                    <Stack
                        sx={{ display: "flex", justifyContent: "space-between" }}
                        direction="row">
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: "8px",
                                    borderColor: "#D0D5DD",
                                    width: "202px",
                                    backgroundColor: "white",
                                    color: "neutral900",
                                    textTransform: "none",
                                    paddingRight: "16px",
                                }}
                                onClick={() => setModalOpenInactiveUser(false)}
                                >
                                    <Typography variant="p2Medium">No</Typography>
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: "8px",
                                    width: "202px",
                                    backgroundColor: "error600",
                                    height: "44px",
                                    textTransform: "none",
                                }}
                                onClick={()=> {
                                 const status = user.status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE;
                                console.log("Toggle status",status)
                                 deactivateUser(status);
                                 closeMenu()
                                }}
                            >
                                <Typography variant="p2Medium" color="whitw">
                                    {" "}
                                    Yes</Typography>
                            </Button>
                    </Stack>
                </Box>
            </Box>): <Box>Loadaing..</Box>}
        </Modal>
    );
};
export default InactiveUserModal;
