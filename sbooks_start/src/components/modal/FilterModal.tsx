import { Box, Button, FormControl, Grid, MenuItem, Modal, Select, SelectChangeEvent, Typography, } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

import X from "../../assets/icons/fi_x.svg";
import Axios from "axios";

interface FilterModalProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  subjectNames: string[];
  setSubjectNames: Dispatch<SetStateAction<string[]>>;
  grade: string;
  setGrade: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>
  author: string;
  setAuthor: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

const FilterModal: React.FC<FilterModalProps> = ({
  modalOpen,
  setModalOpen,
  subjectNames,
  setSubjectNames,
  grade,
  setGrade,
  setPage,
  author,
  setAuthor,
  status,
  setStatus,
}) => {
  const [subjects, setSubjects] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [filtersSaved, setFiltersSaved] = useState(false);

  const grades = {
    ONE: '1st',
    TWO: '2nd',
    THREE: '3rd',
    FOUR: '4th',
    FIVE: '5th',
    SIX: '6th',
    SEVEN: '7th',
    EIGHT: '8th',
    NINE: '9th',
    HIGH_SCHOOL: 'high_school',
    COLLEGE: 'college'
  };

  const status1 = {
    DRAFT: 'draft',
    FOR_APPROVAL: 'for_approval',
    PUBLISHED: 'published',
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await Axios.get("http://0.0.0.0:3740/v1/subjects", {
          headers: {
            "x-api-key": "test"
          }
        });
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);


  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await Axios.get("http://0.0.0.0:3740/v1/authors", {
          headers: {
            "x-api-key": "test"
          }
        });
        setAuthors(response.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    fetchAuthors();
  }, []);

  const handleSubjectClick = (subjectName: string) => {
    setSubjectNames((prevSelected) => {
      if (prevSelected.includes(subjectName)) {
        return prevSelected.filter((name) => name !== subjectName);
      } else {
        return [...prevSelected, subjectName];
      }
    });
  };


  const gradeToQueryParam = (gradeKey: string): string | undefined => {
    return grades[gradeKey.toUpperCase()];
  };

  const handleGradeChange = (gradeKey: string) => {
    const gradeQueryParam = gradeToQueryParam(gradeKey);
    if (gradeQueryParam) {
      setGrade(gradeQueryParam);
    }
  };
  const handleAuthorChange = (event: SelectChangeEvent<string>) => {
    setAuthor(event.target.value);
  };

  const handleStatusChange = (statusKey: string) => {
    const statusQueryParam = status1[statusKey.toUpperCase()];
    if (statusQueryParam) {
      setStatus(statusQueryParam);
    }
  };

  const handleSaveFilters = () => {
    setGrade(grade);
    setStatus(status);
    setSubjectNames(subjectNames);
    setAuthor(author);
    setFiltersSaved(true);
    setModalOpen(false);
  };

  const handleClearFilters = () => {
    setSubjectNames([]);
    setGrade(undefined);
    setStatus(undefined);
    setAuthor(undefined)
    setFiltersSaved(false);
    setModalOpen(false);
    setPage(1);
  };


  return (
    <Modal open={modalOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
      <Box
        sx={{
          position: "absolute",
          transform: "translate(-50%,-50%)",
          top: "50%",
          left: "70%",
          display: "flex",
          width: "auto",
          flexDirection: "column",
          maxHeight: "95%",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            bgcolor: "background.paper",
            boxShadow: 24,
            flexDirection: "column",
            p: 4,
          }}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2em",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Filter
            </Typography>
            <Typography onClick={() => setModalOpen(false)}>
              <Button sx={{}}>
                <img src={X} alt="x" />
              </Button>
            </Typography>
          </Grid>
          <Typography sx={{ paddingBottom: "16px" }}>Subjects</Typography>
          <Grid sx={{ width: "580px", paddingBottom: "26px"}}>
            <Typography
              variant="p2Medium"
              color={"neutral900"}
              sx={{
                textTransform: "none",
                gap: "16px",
                display: "flex",
                flexDirection: "row",
              }}
            >

              <Grid container spacing={2}>
                {subjects.map((subject) => (
                  <Grid item key={subject.SubjectId}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: "8px",
                        border: "1px solid #D0D5DD",
                        color: subjectNames.includes(subject.name)  ? "#083A91" : "#101828",
                        textTransform: "none",
                        paddingRight: "16px",
                        gap: "16px",
                        backgroundColor: subjectNames.includes(subject.name)  ? "#CFDFFC" : "white",
                      }}
                      onClick={() => handleSubjectClick(subject.name)}
                    >
                      {subject.name}
                      {subjectNames.includes(subject.name) && <FaCheck  />}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Typography>
          </Grid>

          <Typography sx={{ paddingBottom: "20px" }}>Grades</Typography>
          <Grid sx={{ width: "580px" }}>
            <Typography
              variant="p2Medium"
              color={"neutral900"}
              sx={{
                textTransform: "none",
                gap: "16px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid container sx={{ gap: "16px", paddingBottom: "30px" }}>
                {Object.keys(grades).map((gradeKey) => (
                  <Grid key={gradeKey}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: "8px",
                        border: "1px solid #D0D5DD",
                        color: grade === grades[gradeKey] ? "#083A91" : "#101828",
                        textTransform: "none",
                        paddingRight: "16px",
                        gap: "16px",
                        backgroundColor: grade === grades[gradeKey] ? "#CFDFFC" : "white",
                      }}
                      onClick={() => handleGradeChange(gradeKey)}
                    >
                      {grades[gradeKey]}
                      {grade === grades[gradeKey] && <FaCheck />} 
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Typography>
          </Grid>

          <Typography sx={{ paddingBottom: "16px" }}> Published by </Typography>
          <FormControl sx={{ marginBottom: "26px" }}>
            <Select
              id="demo-controlled-open-select"
              value={author}
              onChange={handleAuthorChange}
              sx={{
                borderRadius: "8px",
                height: "44px",
                "& .MuiPaper-root": {
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              {authors.map((author, index) => (
                <MenuItem key={index} value={author.Author}>
                  {author.Author}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography sx={{ paddingBottom: "16px" }}>By Status</Typography>
          <Grid container spacing={2} sx={{ paddingBottom: "36px" }}>
            {Object.keys(status1).map((statusKey) => (
              <Grid item key={statusKey}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                    color: status === status1[statusKey] ? "#083A91" : "#101828",
                    textTransform: "none",
                    backgroundColor:
                      status === status1[statusKey] ? "#CFDFFC" : "white",
                  }}
                  onClick={() => handleStatusChange(statusKey)}
                >
                  {status1[statusKey]}
                  {status === status1[statusKey] && <FaCheck />} 
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid sx={{ display: "flex", gap: "16px", marginBottom: "120px" }}>
            <Button
              variant="outlined"
              sx={{ borderColor: "#D0D5DD", borderRadius: "8px" }}
              onClick={handleClearFilters}
            >
              <Typography variant="p2Medium" sx={{ textTransform: "none", borderRadius: "8px" }}>
                Clear All
              </Typography>
            </Button>
            <Button
              variant="outlined"
              sx={{ borderColor: "#D0D5DD", borderRadius: "8px", backgroundColor: "#0B4DC1",   '&:active, &:focus, &:hover': {
                backgroundColor: '#0B4DC1'
            } }}
              onClick={handleSaveFilters}
            >
              <Typography variant="p2Medium" sx={{ textTransform: "none", borderRadius: "8px", color: "#FFFFFF" }}>
                Save
              </Typography>
            </Button>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};
export default FilterModal;
