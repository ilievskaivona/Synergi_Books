import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Button, Grid, Typography } from "@mui/material";
import frame_back from "../assets/icons/Frame-back.svg";
import frame_header from "../assets/icons/Frame-header.svg";
import frame404 from "../assets/icons/Frame404.svg";
import logo from "../assets/icons/logo.svg";
import theme from "../themes/SBookTheme";
import Navbar from "../components/nav/Navbar";

const NotFound: React.FC = () => {
    const drawerWidth = 100;
    return (
        <ThemeProvider theme={theme}>
            <div id="adminPanel">
                <Grid container direction="row">
                    <Grid
                        container
                        alignItems={"center"}
                        position={"fixed"}
                        sx={{
                        borderBottom: "1px solid #D0D5DD",
                        maxHeight: "76px",
                        width: "283px",
                        height: "69px",
                        }}
                    >
                        <img src={logo} style={{ paddingLeft: "32px" }} />
                        <Typography sx={{ paddingLeft: "9px" }}>SYNERGI</Typography>
                    </Grid>

                <Navbar />
                </Grid>
                <Grid>
                    <Grid
                        sx={{
                        justifyContent: "center",
                        display: "flex",
                        paddingTop: "163px",
                        }}
                    >
                        <Grid
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                        <Grid position="absolute">
                            <img src={frame_back} />
                        </Grid>
                        <Grid position="absolute" style={{ paddingTop: "32px" }}>
                            <img
                            src={frame_header}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                            />
                            <img src={frame404} />
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        className="Typo"
                        sx={{
                            display: "flex",
                            flexDirection: "column", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            height: "100vh", 
                        }}
                    >
                        <Typography variant="h5Medium" color="neutral900">
                            Something went wrong!
                        </Typography>
                        <br />
                        <Typography
                            variant="p3Medium"
                            color="neutral500"
                            sx={{ paddingBottom: "32px" }}
                        >
                            Check your internet connection or come back later
                        </Typography>
                        <Typography variant="p2Medium">
                        <Button
                            variant="contained"
                            sx={{
                                height: "44px",
                                width: "142px",
                                padding: "10px 20px",
                                backgroundColor: "#0B4DC1",
                                textTransform: "none",
                                borderRadius: "8px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            Go back
                        </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );
};

export default NotFound;