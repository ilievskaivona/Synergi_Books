import React, { useState } from "react";
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
import EyeOff from "../../assets/icons/fi_eye-off.svg";
import Eye from "../../assets/icons/fi_eye.svg";
import theme from "../../themes/SBookTheme";

export default function SetNewPassword() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === repeatPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
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
        <Box display={"Grid"}>
          <Typography
            variant="h5sSemiBold"
            sx={{
              display: "flex",
              paddingBottom: "6px",
              color: "neutral500",
            }}
          >
            Setup new password
          </Typography>
          <Typography
            variant="p3Medium"
            display={"flex"}
            sx={{ paddingBottom: "32px", color: "neutral500" }}
          >
            Please enter new password that suits your needs.
          </Typography>
          <Typography variant="p2Medium" sx={{ paddingBottom: "12px" }}>
            New Password
          </Typography>
          <FormControl>
            <TextField
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <img src={EyeOff} /> : <img src={Eye} />}
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
                  width: "352pxh",
                  height: "44px",
                  borderRadius: "8px",
                },
              }}
              placeholder="Enter new password"
            />
          </FormControl>
          <Typography variant="p2Medium" sx={{ paddingBottom: "12px" }}>
            Repeat password
          </Typography>
          <FormControl fullWidth sx={{ paddingBottom: "32px" }}>
            <TextField
              id="password"
              type={showRepeatPassword ? "text" : "password"}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle repeat password visibility"
                      onClick={handleClickShowRepeatPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showRepeatPassword ? (
                        <img src={EyeOff} />
                      ) : (
                        <img src={Eye} />
                      )}
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
                  width: "352pxh",
                  height: "44px",
                  borderRadius: "8px",
                },
              }}
              placeholder="Repeat password"
            />
            {!passwordsMatch && (
              <Typography variant="p3Regular" sx={{ color: "error600" }}>
                Passwords do not match
              </Typography>
            )}
          </FormControl>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              padding: "10px 20px",
              backgroundColor: "primary600",
              textTransform: "none",
              borderRadius: "8px",
            }}
          >
            <Typography variant="p2Medium" color="white">
              Change password
            </Typography>
          </Button>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
