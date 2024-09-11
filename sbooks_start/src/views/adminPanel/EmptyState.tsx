import { ThemeProvider } from "@emotion/react";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Profile from "../../assets/icons/Profile-empty-state.svg";
import plus from "../../assets/icons/fi_plus.svg";
import search from "../../assets/icons/fi_search.svg";
import theme from "../../themes/SBookTheme";
import NavbarWrapper from "../../components/nav/NavbarWrapper";

const EmptyState: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div id="adminPanel">
       <NavbarWrapper/>
        <Grid
          id="adminPanelGrid"
          className="bodyCenter"
          sx={{ paddingLeft: "282px" }}
        >
          <Grid
            className="searchStyle"
            sx={{ paddingTop: "32px", paddingLeft: "32px" }}
          >
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={search}
                      style={{ width: "18px", height: "18px" }}
                    />
                  </InputAdornment>
                ),
                sx: {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignSelf: "stretch",
                  flex: "1 0 0",
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  color: "#667085",
                  fontWeight: "400",
                  lineHeight: "24px",
                  letterSpacing: "-0.08px",
                  width: "350px",
                  height: "44px",
                  borderRadius: "8px",
                  padding: "12px 16px",
                },
              }}
              placeholder="Quick search for anything"
            />
          </Grid>
          <Grid
            sx={{
              justifyContent: "center",
              display: "flex",
              paddingTop: "163px",
              paddingBottom: "44px",
            }}
          >
            <img
              src={Profile}
              style={{
                border: "1px solid var(--neutral-100, #f2f4f7)",
                width: "164.954px",
                height: "163.954px",
                borderRadius: "224.594px",
                backgroundColor: "var(--neutral-200, #EAECF0)",
                borderColor: "#FFFFFF",
                borderWidth: "thick",
                boxShadow:
                  " 0px 10px 10px 0px rgba(0, 0, 0, 0.04),  0px 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Grid>
          <Grid className="Typo" sx={{ textAlign: "center" }}>
            <Typography variant="h5Medium" color="neutral900">
              Currently there is no other users added
            </Typography>
            <br />
            <Typography variant="p3Medium" color="neutral500">
              {" "}
              Please add new users and assign them roles!
            </Typography>
          </Grid>
          <Grid
            container
            className="buttonPositionStyle"
            sx={{ justifyContent: "center", paddingTop: "32px" }}
          >
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
                startIcon={
                  <img src={plus} style={{ width: "16px", height: "16px" }} />
                }
              >
                Add users
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default EmptyState;
