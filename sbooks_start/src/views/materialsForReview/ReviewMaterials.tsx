import { Box, Button, Grid, InputAdornment, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, ThemeProvider, Typography, } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import search from "../../assets/icons/fi_search.svg";
import NavbarWrapper from "../../components/nav/NavbarWrapper";
import theme from "../../themes/SBookTheme";
import axios from "axios";


const ReviewMaterials: React.FC = () => {


  const [value, setValue] = React.useState("one");
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [totalBooks, setTotalBooks] = useState(0); 
  const [books, setBooks] = useState([]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  const fetchBooks = useCallback(async () => {
    try {
      let status = "";
      if (value === "one") {
        status = "draft";
      } else if (value === "two") {
        status = "for_approval";
      } else if (value === "three") {
        status = "published";
      }
      const response = await axios.get("http://0.0.0.0:3740/v1/books", {
        headers: {
          "x-api-key": "test"
        },
        params: {
          page,
          pageSize,
          status,
        }
      });
      setBooks(response.data.books);
      setTotalBooks(response.data.totalBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, [page, pageSize, value]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, value]);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const totalPages = Math.ceil(totalBooks / pageSize);
  const isLastPage = page === totalPages;


  return (
    <ThemeProvider theme={theme}>
      <NavbarWrapper />
      <Grid id="adminPanelGrid"  sx={{paddingLeft:"282px"}}
      >
        <Grid
          id="headerGrid"
          container
          sx={{ justifyContent: "space-between", paddingBottom: "20px" }}
        >
          <Grid className="searchStyle" sx={{paddingTop:"32px",paddingLeft:"32px"}}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={search} style={{ width: "18px", height: "18px" }} alt=""/>
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
        </Grid>

        <Grid className="content-padding" sx={{paddingLeft:"32px",paddingRight:"32px"}}>
          <Box sx={{ width: "100%" }}>
          <Tabs
              value={value}
              onChange={handleChange}
              className="bottom-border"
              sx={{borderBottom:"1px solid #D0D5DD"}}
            >
              <Tab
                value="one"
                label="  for approval"
                sx={{ textTransform: "none" }}
              />
              <Tab
                value="two"
                label="Books under review"
                sx={{ textTransform: "none" }}
              />
              <Tab
                value="three"
                label="Approved books"
                sx={{ textTransform: "none" }}
              />
            </Tabs>
          </Box>
        </Grid>

        <Grid
          className="content-padding"
          sx={{
            paddingBottom: "20px",
            paddingTop: "44px",
            paddingLeft:"32px",
            paddingRight:"32px"
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ height: "22px", color: "#475467" }}>
                  <TableCell sx={{ color: "#475467" }}>
                    <Typography variant="p2Medium">Name</Typography>
                  </TableCell>
                  <TableCell sx={{ color: "#475467" }}>Created by</TableCell>
                  <TableCell sx={{ color: "#475467" }}>Subjects</TableCell>
                  <TableCell sx={{ color: "#475467" }}>Grade</TableCell>
                  <TableCell sx={{ color: "#475467" }}>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((row, index) => (
                  <TableRow key={index} sx={{ height: "77px" }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="p1SemiBold" color="neutral900">
                        {row.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6sMedium" color="neutral700">
                        {row.userName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="captionMedium"
                        sx={{ padding: "32px 0px" }}
                      >
                        <Button
                          sx={{
                            padding: "8px 16px",
                            border: "1px solid #D0D5DD",
                            borderColor: "#D0D5DD",
                            borderRadius: "8px",
                            textTransform: "none",
                            color: "#101828",
                          }}
                        >
                          {row.subjectNames}
                        </Button>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p3Medium"
                        sx={{
                          padding: "32px 0px",
                        }}
                      >
                        <Typography
                          sx={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            textTransform: "none",
                          }}
                        >
                          {row.grade}
                        </Typography>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="p3Medium"
                        sx={{
                          padding: "32px 0px",
                        }}
                      >
                        <Typography
                          sx={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            textTransform: "none",
                          }}
                        >
                        {new Date(row.CreatedAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                        </Typography>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="captionMedium"
                        sx={{ padding: "32px 0px" }}
                      >
                    
                            <Typography
                          sx={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            textTransform: "none",
                            textAlign: "center",
                            color:
                              row.status === "published"
                                ? "#027A48"
                                : row.status === "draft"
                                ? "#B42318"
                                : row.status === "for_approval"
                                ? "#101828"
                                : "#101828",
                            backgroundColor:
                              row.status === "published"
                                ? "#D1FADF"
                                : row.status === "draft"
                                ? "#FEE4E2"
                                : row.status === "for_approval"
                                ? "#F2F4F7"
                                : "#F2F4F7",
                          }}
                        >
                          {row.status}
                          </Typography>
                   
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


          <Grid
            className="content-padding"
            sx={{
              paddingTop: "44px",
              paddingRight: "32px",
              paddingLeft: "32px",
              border: "1px"
            }}
          >
            <Grid container justifyContent="space-between">
              <Grid>
                <Typography variant="body1">Total Books: {totalBooks}</Typography>
              </Grid>
              <Grid sx={{ border: "1px solid #D0D5DD", borderRadius: "4px" }}>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#667085",
                    borderRadius: "0"
                  }}
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </Button>
                <Button
                  sx={{
                    color: "#667085",
                    borderLeft: "1px solid #D0D5DD",
                    borderRadius: "0",
                    margin: "0 16px"
                  }}>
                  {page}
                </Button>
                <Button
                  disabled={isLastPage || totalBooks === 0}
                
                  sx={{
                    textTransform: "none",
                    color: "#667085",
                    borderLeft: "1px solid #D0D5DD",
                    borderRadius: "0"
                  }}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </Button>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ReviewMaterials;
