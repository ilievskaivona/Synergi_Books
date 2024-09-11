import {
  Box,
  Tab,
  Tabs,
  Grid,
  Link,
  Button,
  Typography,
  Breadcrumbs,
  ThemeProvider,
} from "@mui/material";

import React from "react";
import theme from "../../themes/SBookTheme";
import library from "../../assets/icons/library.svg";
import NavbarWrapper from "../../components/nav/NavbarWrapper";

import DocumentIcon from "../../assets/icons/Document.svg";
import DocumentIconBlue from "../../assets/icons/DocumentBlue.svg";
import EditIconBlue from "../../assets/icons/EditBlue.svg";
import EditIcon from "../../assets/icons/EditTab.svg";
import DetailsIconBlue from "../../assets/icons/More Square.svg";
import DetailsIcon from "../../assets/icons/More-Square.svg";

import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Resources from "../resources/Resources";
import Details from "../details/Details";
import EditTableOfContents from "./EditTableOfContents";

interface Tabb {
  id: string;
  name: string;
  value: string;
  icon: any;
  selectedTabIcon: any;
  component: JSX.Element;
}

const TABS: Tabb[] = [
  {
    id: "",
    name: "Edit",
    value: "1",
    icon: EditIcon,
    selectedTabIcon: EditIconBlue,
    component: <EditTableOfContents />,
  },
  {
    id: "",
    name: "Resources",
    value: "2",
    icon: DocumentIcon,
    selectedTabIcon: DocumentIconBlue,
    component: <Resources />,
  },
  {
    id: "",
    name: "Details",
    value: "3",
    icon: DetailsIcon,
    selectedTabIcon: DetailsIconBlue,
    component: <Details />,
  },
];

const Review: React.FC = () => {
  const [value, setValue] = React.useState("1");

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/library">
      Library
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/">
      Word Wonders: Exploring the Magic of English
    </Link>,
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div id="adminPanel">
      <ThemeProvider theme={theme}>
        <NavbarWrapper />
        <Grid
          sx={{
            paddingLeft: "292px",
            paddingTop: "30px",
            paddingRight: "5px",
          }}
        >
          <Grid
            container
            justifyContent="space-between"
            sx={{ paddingLeft: "0px", paddingRight: "10px" }}
          >
            <Grid
              sx={{
                display: "flex",
                border: "1px solid #D0D5DD",
                padding: "8px",
                borderRadius: "8px",
                backgroundColor: "neutral50",
                width: "510px",
                marginLeft: "25px",
              }}
            >
              <img
                src={library}
                alt="Library Icon"
                style={{ marginRight: "15px" }}
              />
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Grid>
            <div style={{ justifyContent: "end" }}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "8px",
                  border: "1px solid #D0D5DD",
                  marginRight: "16px",
                  padding: "10px 20px 10px 20px",
                }}
              >
                <Typography
                  variant="p2Medium"
                  color={"neutral400"}
                  sx={{ textTransform: "none" }}
                >
                  Return feedback to creator
                </Typography>
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderColor: "neutral300",
                  borderRadius: "8px",
                  backgroundColor: "#0B4DC1",
                  padding: "10px 20px 10px 20px",
                }}
              >
                <Typography
                  variant="p2Regular"
                  sx={{ textTransform: "none", color: "#FFFFFF" }}
                >
                  Publish
                </Typography>
              </Button>
            </div>
          </Grid>
          <div
            style={{
              paddingBottom: "30px",
            }}
          >
            <TabContext value={value}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  borderBottom: 1,
                  borderColor: "divider",
                  marginLeft: "40px",
                  // paddingBottom: "40px"
                 
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  sx={{ justifyContent: "left", }}
                >
                  {TABS.map((item, index) => (
                    <Tab
                      key={item.value}
                      label={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "self-end",
                            textTransform: "none",
                            color: value === item.value ? "#0B4DC1" : "#667085",
                          }}
                        >
                          <img
                            src={
                              value === item.value
                                ? item.selectedTabIcon
                                : item.icon
                            }
                            alt="Item One"
                            style={{ marginRight: "8px" }}
                          />
                          <br />
                          {item.name}
                        </div>
                      }
                      value={item.value}
                    />
                  ))}
                </Tabs>
              </Box>
              {TABS.map((item, index) => (
                <TabPanel key={item.value} value={item.value}>
                  {item.component}
                </TabPanel>
              ))}
            </TabContext>
          </div>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Review;
