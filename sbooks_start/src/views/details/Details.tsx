import { ThemeProvider } from "@emotion/react";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  OutlinedInput,
  Typography,
  useFormControl,
} from "@mui/material";
import React, { useState } from "react";
import plus from "../../assets/icons/fi_plus-dark.svg";
import AddAttributiorsModal from "../../components/modal/AddAttributiorsModal";
import AddSubjectModal from "../../components/modal/AddSubjectModal";
import AddTagsModal from "../../components/modal/AddTagsModal";
import theme from "../../themes/SBookTheme";

const Details: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  

  const [modalOpenAddSubject, setModalOpenAddSubject] = useState(false);
  const [modalOpenAddTags, setModalOpenAddTags] = useState(false);
  const [modalOpenAddAttributiors, setModalOpenAddAttributiors] =
    useState(false);

  function MyFormHelperText() {
    const { focused } = useFormControl() || {};
    const helperText = React.useMemo(() => {
      if (focused) {
        return "This field is being focused";
      }
      return "Helper text";
    }, [focused]);
    return <FormHelperText>{helperText}</FormHelperText>;
  }
  return (
    <div id="adminPanel">
      <ThemeProvider theme={theme}>
        <Grid sx={{ paddingRight: "5px" }}>
          <Typography sx={{ paddingBottom: "16px" }}>Book Name</Typography>
          <FormControl sx={{ paddingBottom: "30px", width: "568px" }}>
            <OutlinedInput
              sx={{ borderRadius: "8px", height: "44px" }}
              placeholder="Word Wonders: Exploring the Magic of English"
            />
          </FormControl>
          <Typography sx={{ paddingBottom: "16px" }}>Attributions</Typography>
          <FormControl sx={{ width: "568px" }}>
            <OutlinedInput
              sx={{ borderRadius: "8px", height: "44px" }}
              placeholder="Author: Milosh Jakjimovski"
            />
            <Grid
              container
              className="buttonPositionStyle"
              sx={{
                justifyContent: "center",
                paddingTop: "32px",
                display: "inline-block",
                paddingBottom: "32px",
              }}
            >
              <Typography variant="p2Medium">
                <Button
                  variant="outlined"
                  sx={{
                    height: "44px",
                    width: "221px",
                    padding: "10px 20px",
                    backgroundColor: "nwutral100",
                    textTransform: "none",
                    borderRadius: "8px",
                    color: "#101828",
                    borderColor: "#D0D5DD",
                  }}
                  startIcon={
                    <img src={plus} style={{ width: "16px", height: "16px" }} />
                  }
                  onClick={() => setModalOpenAddAttributiors(true)}
                >
                  Add new attributions
                </Button>
              </Typography>
            </Grid>
          </FormControl>
          <Typography sx={{ paddingBottom: "16px" }}>Subjects</Typography>
          <FormControl sx={{ width: "568px", borderRadius: "8px" }}>
            <OutlinedInput
              sx={{ borderRadius: "8px", height: "44px" }}
              placeholder="English"
            />
            <Grid
              container
              className="buttonPositionStyle"
              sx={{
                justifyContent: "center",
                paddingTop: "32px",
                display: "inline-block",
                paddingBottom: "32px",
              }}
            >
              <Typography variant="p2Medium">
                <Button
                  variant="outlined"
                  sx={{
                    height: "44px",
                    width: "164px",
                    padding: "10px 20px",
                    backgroundColor: "nwutral100",
                    textTransform: "none",
                    borderRadius: "8px",
                    color: "#101828",
                    borderColor: "#D0D5DD",
                  }}
                  startIcon={
                    <img src={plus} style={{ width: "16px", height: "16px" }} />
                  }
                  onClick={() => setModalOpenAddSubject(true)}
                >
                  Add subjects
                </Button>
              </Typography>
            </Grid>
          </FormControl>
          <Grid sx={{ paddingBottom: "40px" }}>
            <Typography sx={{ paddingBottom: "16px" }}>Difficulty</Typography>
            <Button sx={{ paddingRight: "32px" }}>
              <Typography color={"neutral500"} sx={{ textTransform: "none" }}>
                Basic
              </Typography>
            </Button>
            <Button sx={{ paddingRight: "32px" }}>
              <Typography color={"neutral500"} sx={{ textTransform: "none" }}>
                At grade
              </Typography>
            </Button>
            <Button
              sx={{ borderRadius: "8px" }}
              variant="contained"
              color="primary"
            >
              <Typography color={"#FFFFFF"} sx={{ textTransform: "none" }}>
                Advanced
              </Typography>
            </Button>
          </Grid>
          <Grid>
            <Typography sx={{ paddingBottom: "16px" }}>Grades</Typography>
            <Grid container sx={{ paddingBottom: "40px" }}>
              <Typography
                variant="p3Medium"
                sx={{ paddingRight: "32px", color: "#667085" }}
              >
                1
              </Typography>
              <Typography
                variant="p3Medium"
                sx={{ paddingRight: "32px", color: "#667085" }}
              >
                2
              </Typography>
              <Typography
                variant="p3Medium"
                sx={{ paddingRight: "32px", color: "#667085" }}
              >
                3
              </Typography>
              <Typography
                variant="p3Medium"
                sx={{ paddingRight: "32px", color: "#667085" }}
              >
                4
              </Typography>
              <Typography
                variant="p3Medium"
                sx={{ paddingRight: "32px", color: "#667085" }}
              >
                5
              </Typography>
              <Typography
                variant="p3Medium"
                sx={{ paddingRight: "32px", color: "#667085" }}
              >
                6
              </Typography>
              <Typography
                variant="p3Medium"
                sx={{ paddingRight: "32px", color: "#667085" }}
              >
                7
              </Typography>
              <Typography
                variant="p3Medium"
                sx={{ paddingRight: "32px", color: "#667085" }}
              >
                8
              </Typography>
              <Typography
                variant="p3Medium"
                sx={{ paddingRight: "32px", color: "#667085" }}
              >
                9
              </Typography>
              <Typography
                variant="p3Medium"
                sx={{ paddingRight: "32px", color: "#667085" }}
              >
                High School
              </Typography>
              <Typography
                variant="p3Medium"
                sx={{ paddingRight: "32px", color: "#667085" }}
              >
                College
              </Typography>
            </Grid>
          </Grid>
          <Typography sx={{ paddingBottom: "13px" }}>Tags</Typography>
          <FormControl sx={{ width: "568px" }}>
            <OutlinedInput
              sx={{ borderRadius: "8px", height: "44px" }}
              placeholder="English"
            />
            <Grid
              container
              className="buttonPositionStyle"
              sx={{
                justifyContent: "center",
                paddingTop: "32px",
                display: "inline-block",
              }}
            >
              <Typography variant="p2Medium">
                <Button
                  variant="outlined"
                  sx={{
                    height: "44px",
                    width: "132px",
                    padding: "10px 20px",
                    backgroundColor: "nwutral100",
                    textTransform: "none",
                    borderRadius: "8px",
                    color: "#101828",
                    borderColor: "#D0D5DD",
                  }}
                  startIcon={
                    <img src={plus} style={{ width: "16px", height: "16px" }} />
                  }
                  onClick={() => setModalOpenAddTags(true)}
                >
                  Add tags
                </Button>
              </Typography>
            </Grid>
            <AddSubjectModal
              modalOpenAddSubject={modalOpenAddSubject}
              setModalOpenAddSubject={setModalOpenAddSubject}
            />
            <AddAttributiorsModal
              modalOpenAddAttributiors={modalOpenAddAttributiors}
              setModalOpenAddAttributiors={setModalOpenAddAttributiors}
            />
            <AddTagsModal
              modalOpenAddTags={modalOpenAddTags}
              setModalOpenAddTags={setModalOpenAddTags}
            />
          </FormControl>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Details;
function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrum");
}
