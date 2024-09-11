import {
    Box,
    Button,
    Checkbox,
    CssBaseline,
    Link,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField,
    ThemeProvider,
    Typography,
  
  } from "@mui/material";
  import React, { useState } from "react";
  import theme from "../../themes/SBookTheme";
  import Profile from "../../assets/icons/Profile-login.svg";
  import EyeOff from "../../assets/icons/fi_eye-off.svg";
  import Eye from "../../assets/icons/fi_eye.svg";

const Login: React.FC =  () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [showPassword, setShowPassword] = useState(false)
const [checked, setChecked] = useState(false)

const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => 
    setChecked(event.target.checked)

const showPasswordClick  = () => setShowPassword((show) => !show)
// TODO: implement this function
const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { email, password };

    localStorage.setItem("user", JSON.stringify(user));
   // return navigate("/");
};
    return(
        <ThemeProvider theme={theme}>
            <Grid
                container
                sx={{
                width: "416px",
                display: "flex",
                padding: "20px 32px 32px 32px",
                alignItems: "flex-start",
                alignSelf: "stretch",
                gap: "32px",
                top: "50%",
                left: "50%",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                position: "absolute",
                border: "1px solid",
                borderColor: "neutral100",
                borderRadius: "8px",
                boxShadow: "shadowxl",
                }}
            >
                <Box display={"grid"}>
                    <form onSubmit={handleSubmit}>
                    <Typography
                    variant="h5sSemiBold"
                    sx={{ display: "flex", paddingBottom: "32px" }}>
                    Log in
                    </Typography>  

                    <Typography
                     variant="p2Medium"
                     sx={{ display: "flex", paddingBottom: "12px" }}>
                    Email address
                    </Typography>
                        <FormControl sx={{ paddingBottom: "24px" }} variant="outlined">
                            <OutlinedInput
                            id="outlined-input-email"
                            type="email"
                            placeholder="Enter your email address"
                            startAdornment={
                                <InputAdornment position="start">
                                <img src={Profile}/>
                                </InputAdornment>
                            }
                            sx={{ height: "44px", width: "352px", borderRadius: "8px" }}
                            inputProps={{
                                sx: {
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "16px",
                                  fontStyle: "normal",
                                  color: "neutral500",
                                  fontWeight: "400",
                                  lineHeight: "24px",
                                  letterSpacing: "-0.08px",
                                },
                              }}
                              value={email}
                              onChange={({target}) => {setEmail(target.value)} }
                            />  
                        </FormControl>

                    <Typography
                    variant="p2Medium"
                    sx={{ display: "flex", paddingBottom: "12px" }}>
                    Password
                    </Typography>
                        <FormControl sx={{ paddingBottom: "18px" }} variant="outlined">
                            <TextField
                            id="outlined-input-password"
                            type={showPassword? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={({target}) => {setPassword(target.value)} }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle-password-visibility"
                                        edge="end"
                                        onClick={showPasswordClick}>
                                            { showPassword? (<img src={EyeOff}/>) : 
                                            (<img src={Eye}/>)
                                            }
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
                                    width: "352px",
                                    height: "44px",
                                    borderRadius: "8px",
                                  },
                            }}
                      
                            />  
                        </FormControl>
                    <Grid
                    sx={{
                    paddingBottom: "22px",
                    justifyContent: "space-between",
                    display: "flex",
                    alignItems: "center",
                    height: "auto",
                    }}
                    >
                    
                     <Grid>
                        <Checkbox
                        checked={checked}
                        onChange={handleCheck}/>
                        
                        <Typography
                         variant="p3Medium"
                         color="neutral900"
                        >
                        Remember me
                        </Typography>
                    
                     </Grid>
                     <Link
                        href="/forgot-password"
                        variant="p3SemiBold"
                        sx={{
                        textDecoration: "none",
                        textAlign: "right",
                        padding: "0px",
                        }}
                     >
                     Forgot password?
                    </Link>
                    </Grid>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            borderRadius: "8px",
                            textTransform: "none",
                            backgroundColor: "primary600",
                            height: "44px",
                        }}
                        type="submit"
                        >
                        <Typography variant="p2Medium" color={"white"}>
                            Log in
                        </Typography>
                      </Button>
                    </form> 
                </Box>
            </Grid>
        </ThemeProvider>
    )
}
export default Login;