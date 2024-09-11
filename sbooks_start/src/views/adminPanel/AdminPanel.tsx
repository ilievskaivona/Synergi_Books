import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import deactive from "../../assets/icons/Deactivate-user.svg";
import edit from "../../assets/icons/Edit.svg";
import moreVertical from "../../assets/icons/fi_more-vertical.svg";
import plus from "../../assets/icons/fi_plus.svg";
import search from "../../assets/icons/fi_search.svg";
import EditUserDetailsModal from "../../components/modal/EditUserDetailsModal";
import InactiveUserModal from "../../components/modal/InactiveUserModal";
import InviteUserModal from "../../components/modal/InviteUserModal";
import NavbarWrapper from "../../components/nav/NavbarWrapper";
import theme from "../../themes/SBookTheme";
import Axios from "axios"; 
import { User, UserStatus } from "../../types/User"
  
function AdminPanel() {
    const [modalOpenEditUserDetails, setModalOpenEditUserDetails] = useState(false)
    const [modalOpenInactiveUser, setModalOpenInactiveUser] = useState(false)
    const [modalOpen,setModalOpen] = useState(false)
    const [clickedUser, setClickedUser] = useState<User>();
    const [users, setUsers] = useState<User[] | null>([]);
    const [status, setStatus] = useState("Deactivate user")
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 3;
    const [totalUsers, setTotalUsers] = useState(0); 

    const open = Boolean(anchorEl);

    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, user: User) => {
      setAnchorEl(event.currentTarget);
      setClickedUser(user);
       setStatus( user.status === UserStatus.ACTIVE ? "Deactivate user" : "Activate user" );
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
     const handleUserCreated = (newUser: any) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await Axios.get("http://0.0.0.0:3740/v1/users", {
        headers: {
          "x-api-key": "test",
        },
        params: {
          searchQuery: searchQuery,
          page,
          pageSize
        }, 
      })
        setUsers(response.data.users);
        setTotalUsers(response.data.totalUsers);
        console.log("Users", response.data.users)
         console.log("Page size",pageSize)
      
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("No users found with the provided search query.");
        setUsers([]);
      } else {
        console.error("Error fetching users:", error.message);
      }
    }
  }
  fetchUsers();
}, [searchQuery, page, pageSize]);
      
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
   const totalPages = Math.ceil(totalUsers / pageSize);
   const isLastPage = page === totalPages;
  return (
    <ThemeProvider theme={theme}>
      <NavbarWrapper />
      <Grid
        id="adminPanelGrid"
        className="bodyCenter"
        sx={{ paddingLeft: "282px" }}
      >
        <Grid
          id="headerGrid"
          container
          sx={{ justifyContent: "space-between", paddingBottom: "20px" }}
        >
          <Grid
            className="searchStyle"
            sx={{ paddingTop: "32px", paddingLeft: "32px" }}
          > 
          <TextField
           value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <img alt="" src={search}
                    style={{ width: "18px", height: "18px" }}/>
                </InputAdornment>
            ),
            sx: {
                display: "flex",
                flexDirection: "user",
                justifyContent: "center",
                alignSelf: "stretch",
                flex: "1 0 0",
                fontFamily: "Plus Jakarta Sans",
                fontSize: "16px",
                fontStyle: "normal",
                color: "neutral500",
                fontWeight: "400",
                lineHeight: "24px",
                letterSpacing: "-0.08px",
                width: "350px",
                height: "44px",
                borderRadius: "8px",
                padding: "12px 16px",
              },
            placeholder:"Quick search for anything"
          }}
          >
          </TextField>
          </Grid>
          <Typography
            variant="p2Medium"
            sx={{ paddingTop: "32px", paddingRight: "32px" }}
          >
            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              sx={{
                height: "44px",
                width: "142px",
                padding: "10px 20px",
                backgroundColor: "primary600",
                textTransform: "none",
                borderRadius: "8px",
              }}
              startIcon={<img alt="" src={plus} />}
            >
              Add Users
            </Button>
          </Typography>
        </Grid>
        {/* add users & search */}

        <Grid sx={{ paddingLeft: "32px", paddingBottom: "20px" }}>
          <TableContainer>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ height: "22px", color: "neutral600" }}>
            <TableCell >
            <Typography variant="h6sMedium" color="neutral600">Name</Typography></TableCell>
            <TableCell align="center" ><Typography variant="h6sMedium" color="neutral600">Email</Typography></TableCell>
            <TableCell align="center" ><Typography variant="h6sMedium" color="neutral600">Role</Typography></TableCell>
            <TableCell align="center" ><Typography variant="h6sMedium" color="neutral600">Status</Typography></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: User) => (
            <TableRow
              key={user.DBUserId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="user">
              <Typography variant="p1SemiBold" color="neutral900">
                        {user.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6sMedium" color="neutral700">
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="captionMedium"
                        sx={{ padding: "32px 0px" }}
                >
              <Button variant="outlined"
               sx={{
                padding: "8px 16px",
                border: "1px solid neutral300",
                borderColor: "neutral300",
                borderRadius: "8px",
                textTransform: "none",
                color: "neutral900",
              }}>{user.role}</Button>
                </Typography>
                </TableCell>
              <TableCell align="center">
              <Typography
                          sx={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            textTransform: "none",
                            textAlign: "center",
                            color:
                              user.status === "Active"
                                ? "success700"
                                : user.status === "Inactive"
                                ? "error700"
                                : user.status === "Pending"
                                ? "neutral900"
                                : "neutral900",
                            backgroundColor:
                              user.status === "Active"
                                ? "success100"
                                : user.status === "Inactive"
                                ? "error100"
                                : user.status === "Pending"
                                ? "neutral100"
                                : "neutral100",
                          }}
                        >{user.status}
                        </Typography>
                        </TableCell>
                        <TableCell>
                     <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={(e) => handleClick(e, user)}
                    >
                        <img alt="" src={moreVertical}/>
                         </IconButton>
                         <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                        >
                          <MenuItem
                            key={"edit"}
                            onClick={() => {
                              setModalOpenEditUserDetails(true)
                            }}
                            sx={{ gap: "8px" }}
                          >
                            <img alt="" src={edit} />
                            Edit
                          </MenuItem>
                          <MenuItem
                            key={"activate"}
                            sx={{ gap: "8px" }}
                            onClick={() => {
                              console.log(user.status)
                              setModalOpenInactiveUser(true)}}

                          >
                            <img alt="" src={deactive} />
                           {status}
                          </MenuItem>
                        </Menu>
                        </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <InviteUserModal     modalOpen = {modalOpen}
    setModalOpen = {setModalOpen}
    onUserCreated={handleUserCreated}/>
    <EditUserDetailsModal 
    modalOpenEditUserDetails = {modalOpenEditUserDetails}
    setModalOpenEditUserDetails = {setModalOpenEditUserDetails}
     user = {clickedUser}
     users={users}
     setUsers={setUsers} 
     closeMenu={handleClose}
    />
    <InactiveUserModal modalOpenInactiveUser = {modalOpenInactiveUser}
    setModalOpenInactiveUser = {setModalOpenInactiveUser}
    user={clickedUser}
    setUsers={setUsers} 
    closeMenu={handleClose}/>
           </Grid>

          <Grid
            className="content-padding"
            sx={{
              paddingTop: "44px",
              paddingRight: "32px",
              paddingLeft: "32px",
              border: "1px"
            }}
          >
        <Grid container justifyContent="space-between">
              <Grid>
                <Typography variant="body1">Total ammount: {totalUsers}</Typography>
              </Grid>
              <Grid sx={{ border: "1px solid #D0D5DD", borderRadius: "4px" }}>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#667085",
                    borderRadius: "0"
                  }}
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </Button>
                <Button
                  sx={{
                    color: "#667085",
                    borderLeft: "1px solid #D0D5DD",
                    borderRadius: "0",
                    margin: "0 16px"
                  }}>
                  {page}
                </Button>
                <Button
                  disabled={isLastPage}
                  sx={{
                    textTransform: "none",
                    color: "#667085",
                    borderLeft: "1px solid #D0D5DD",
                    borderRadius: "0"
                  }}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
            </Grid>
          </Grid>
  
    </ThemeProvider>
  );
}

export default AdminPanel;
