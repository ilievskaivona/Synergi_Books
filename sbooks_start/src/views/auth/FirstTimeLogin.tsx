import {
    Box,
    Button,
    CssBaseline,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    ThemeProvider,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import EyeOff from "../../assets/icons/fi_eye-off.svg";
  import Eye from "../../assets/icons/fi_eye.svg";
  import theme from "../../themes/SBookTheme";


  const FirstTimeLogin: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [passwordsMatchText, setPasswordsMatchText] = useState(true);
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowRepeatPassword = () => setShowRepeatPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
      ) => {
        event.preventDefault();
      };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(password === repeatPassword) {
            setPasswordsMatch(true);
            setPasswordsMatchText(true);
        }
        else {
            setPasswordsMatch(false);
            setPasswordsMatchText(false);
        }
    };

    return(
        <ThemeProvider theme={theme}>
            <Grid
            container sx={{
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
                padding: "20px 32px 32px 32px",
                alignItems: "flex-start",
                alignSelf: "stretch",
                gap: "32px",
            }}
            >
                <CssBaseline />
                <Box display={"Grid"}>
                    <Typography variant="h5sSemiBold"
                    sx={{
                        display: "flex",
                        paddingBottom: "12px",
                        color: "neutral900"
                    }}
                    >
                        Setup new password?
                    </Typography>
                    <Typography variant="p3Medium"
                    sx={{
                        display: "flex",
                        paddingBottom: "32px",
                        color: "neutral500"
                    }}
                    >
                        We provided you with a password but if you are not 
                        feeling comfortable using that one please change it.
                    </Typography>
                    <Typography variant="p2Medium" sx={{ paddingBottom: "12px" }}>
                        New Password
                    </Typography>
                    <FormControl fullWidth sx={{ paddingBottom: "32px"}}>
                        <TextField
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange = {(e) => {
                            setPassword(e.target.value);
                            if(e.target.value === repeatPassword) {
                                setPasswordsMatch(true);
                                setPasswordsMatchText(true);
                            } 
                            else {
                                setPasswordsMatch(false);
                                setPasswordsMatchText(false);
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                        {showPassword ? <img src={Eye}/> : <img src={EyeOff}/>}
                                    </IconButton>
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
                                height: "44px",
                                borderRadius: "8px",
                            },
                        }}
                        placeholder="Enter new password"
                        >
                        </TextField>
                    </FormControl>

                    <Typography variant="p2Medium" sx={{ paddingBottom: "12px" }}>
                        Repeat Password
                    </Typography>

                    <FormControl fullWidth sx={{ paddingBottom: "32px"}}>
                        <TextField
                        id="password"
                        type={showRepeatPassword ? "text" : "password"}
                        value={repeatPassword}
                        onChange={(e) => {
                            setRepeatPassword(e.target.value);
                            if(password === e.target.value) {
                                setPasswordsMatch(true);
                                setPasswordsMatchText(true);
                            } 
                            else {
                                setPasswordsMatch(false);
                                setPasswordsMatchText(false);
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowRepeatPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showRepeatPassword ? (
                                        <img src={Eye}/> 
                                    ) : ( <img src={EyeOff}/> )}
                                    </IconButton>
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
                                height: "44px",
                                borderRadius: "8px",
                            },
                        }}
                        placeholder="Repeat new password"
                        >
                        </TextField>
                        {!passwordsMatchText &&
                            password != "" &&
                            repeatPassword != "" && (
                                <Typography variant="p3Regular" sx={{ color: "error600" }}>
                                    Passwords do not match
                                </Typography>
                            )}
                    </FormControl>

                    <Button variant="contained"
                        onClick={handleSubmit}
                        disabled={!passwordsMatch}
                        sx={{
                        padding: "10px 20px",
                        "&:disabled": {
                            backgroundColor: passwordsMatch ? "primary600" : "neutral400",
                        },
                        textTransform: "none",
                        borderRadius: "8px",
                        }}
                    >
                        <Typography variant="p2Medium" sx={{ color: "white" }}>
                            Change Password
                        </Typography>
                    </Button>
                </Box>
            </Grid>
        </ThemeProvider>
    );
  };

export default FirstTimeLogin;

function handleSubmit(event: Event) {
    throw new Error("Function not implemented.");
  }
