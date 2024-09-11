import React from "react";
import {
    Box,
    Grid,
    AppBar,
    Button,
    Divider,
    Toolbar,
    Typography,
    ThemeProvider,
} from "@mui/material";
import gb from "../../assets/icons/GB.svg";
import theme from "../../themes/SBookTheme";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
    window?: () => Window;
  }

const Navbar: React.FC = (props: Props) => {
    const navigate = useNavigate();

    const drawerWidth = 283;
    const navbarHeight = 76;

    const user = localStorage.getItem("user");
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid display="block">
                <AppBar
                      position="fixed"
                      sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        maxHeight: navbarHeight,
                        bgcolor: "white",
                        ml: { sm: `${drawerWidth}px` },
                        borderBottom: "1px solid",
                        borderColor: "neutral300",
                      }}
                >
                    <Toolbar
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                            padding: "0px 32px",
                        }}
                    >

                        <Typography
                            variant="p2Medium"
                            component="div"
                            align="right"
                            padding="16px 0px"
                        >
                            <Box display="inline-flex" alignItems="right">

                                <Button startIcon={<img src={gb} alt="GB" style={{ marginRight: "8px" }} />} endIcon={<KeyboardArrowDownIcon />}>
                                    <Typography
                                        color="neutral900"
                                        variant="p2Medium"
                                        textTransform={"none"}
                                    >
                                        English
                                    </Typography>
                                </Button>
                                <Button color="inherit">
                                    <Typography
                                        color="neutral900"
                                        variant="p2Medium"
                                        textTransform={"none"}
                                    >
                                        Username
                                    </Typography>
                                </Button>
                                <Divider orientation="vertical" variant="middle" flexItem />
                                {user ? (
                                    <Button color="inherit" onClick={handleLogout}>
                                        <Typography
                                            color="primary600"
                                            variant="p2Medium"
                                            textTransform="none"
                                        >
                                            Logout
                                        </Typography>
                                    </Button>
                                ) : (
                                    <Button color="inherit" onClick={() => navigate("/login")}>
                                        <Typography
                                            color="primary600"
                                            variant="p2Medium"
                                            textTransform="none"
                                        >
                                            Login
                                        </Typography>
                                    </Button>
                                )}
                            </Box>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Grid>
        </ThemeProvider>
    );
}

export default Navbar;