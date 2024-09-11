import React from "react";
import {
    Box,
    Grid,
    Button,
    TextField,
    Typography,
    FormControl,
    CssBaseline,
    ThemeProvider,
    InputAdornment,
} from "@mui/material";
import theme from "../../themes/SBookTheme";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/icons/Profile-login.svg";

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();

    const navigateToSetNewPassword = () => {
        navigate("/new-password");
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                sx={{
                    top: "50%",
                    left: "50%",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    border: "1px solid",
                    borderColor: "neutral200",
                    borderRadius: "8px",
                    boxShadow: "shadowxl",
                    width: "416px",
                    display: "flex",
                    padding: "32px",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    gap: "32px",
                }}
            >
                <CssBaseline />
                <Box display={"grid"}>
                    <Typography
                        variant="h5sSemiBold"
                        sx={{ display: "flex", paddingBottom: "12px", color: "neutral900" }}
                    >
                        Forgot password
                    </Typography>
                    <Typography
                        variant="p3Medium"
                        sx={{ display: "flex", paddingBottom: "32px", color: "neutral500" }}
                    >
                        Tell us the email address associated with your account, and we’ll
                        send you an email with a link to reset your password.
                    </Typography>
                    <Typography
                        variant="p2Medium"
                        sx={{ paddingBottom: "12px", color: "neutral900" }}
                    >
                        Email adress
                    </Typography>
                    <FormControl fullWidth>
                        <Typography variant="p2Regular">
                            <TextField
                                margin="normal"
                                required
                                id="email"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <img src={Profile} />
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
                                    }
                                }}
                                fullWidth
                                placeholder="Enter your email address here"
                                name="email"
                                sx={{
                                    paddingBottom: "32px",
                                    marginBottom: "0px",
                                    marginTop: "0px",
                                }}
                            />
                        </Typography>
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{
                            padding: "10px 20px",
                            backgroundColor: "primary600",
                            borderRadius: "8px",
                        }}
                        onClick={navigateToSetNewPassword}
                    >
                        <Typography
                            variant="p2Medium"
                            color="white"
                            sx={{ textTransform: "none" }}
                        >
                            Reset Password
                        </Typography>
                    </Button>
                </Box>
            </Grid>
        </ThemeProvider >
    );
}
export default ForgotPassword;