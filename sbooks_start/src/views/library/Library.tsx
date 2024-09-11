import React, { useEffect, useState } from "react";
import { Button, Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, } from "@mui/material";
import Axios from "axios";

import filterIcon from "../../assets/icons/fi_filter.svg";
import search from "../../assets/icons/fi_search.svg";
import noResult from "../../assets/icons/no-results-found.svg";
import NavbarWrapper from "../../components/nav/NavbarWrapper";
import theme from "../../themes/SBookTheme";
import FilterModal from "../../components/modal/FilterModal";
import SortBooks from "./SortBooks";

const Library: React.FC = () => {

  const [anchorElSort, setAnchorElSort] = React.useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [totalBooks, setTotalBooks] = useState(0); 
  const openSort = Boolean(anchorElSort);
  const [subjectNames, setSubjectNames] = useState<string[]>([]);
  const [author, setAuthor] = useState();
  const [status, setStatus] = useState<string>();
  const [grade, setGrade] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");



  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await Axios.get("http://0.0.0.0:3740/v1/books", {
          headers: {
            "x-api-key": "test"
          },
          params: {
            page,
            pageSize,
            subjectNames: subjectNames.join(","),
            grade,
            author,
            status,
            searchQuery: searchQuery,
            sortBy
          }
        });
        console.log("sort query", sortBy);
        
        setBooks(response.data.books);
        setTotalBooks(response.data.totalBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [page, pageSize, subjectNames, grade, author, status, searchQuery, sortBy]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCloseSort = () => {
    setAnchorElSort(null);
  };
  const handleClickSort = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSort(event.currentTarget);
  };

  const totalPages = Math.ceil(totalBooks / pageSize);
  const isLastPage = page === totalPages;

  return (
    <ThemeProvider theme={theme}>
      <NavbarWrapper />
      <Grid id="adminPanelGrid" className="bodyCenter" sx={{ paddingBottom: "50px", paddingLeft: "282px" }}>
        <Grid id="headerGrid" container sx={{ justifyContent: "space-between", paddingBottom: "20px" }}>
          <Grid className="searchStyle" sx={{ paddingTop: "32px", paddingLeft: "32px" }} >
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={search} style={{ width: "18px", height: "18px" }} alt="search" />
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
                  fontWeight: "200",
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
        <Grid
          sx={{
            paddingRight: "32px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "16px",
            height: "44px",
          }}>
          <Button onClick={() => setModalOpen(true)}
            sx={{
              display: "flex",
              padding: "0px 20px 0px 22px",
              alignItems: "center",
              gap: "8px",
              flexShrink: "0",
              borderRadius: "8px",
              border: "1px solid #D0D5DD",
              height: "44px",
            }} >
            <Typography variant="p2Medium" sx={{ display: "flex", alignItems: "center", gap: "8px" }} >
              <Grid textTransform={"none"}>Filter</Grid>
              <Grid>
                <img src={filterIcon} style={{ paddingTop: "5px", width: "20px" }} alt="filter" />
              </Grid>
            </Typography>
          </Button>
          <SortBooks
           sortBy={sortBy}
           setSortBy={setSortBy}
            handleClickSort={handleClickSort}
            anchorElSort={anchorElSort}
            openSort={openSort}
            handleCloseSort={handleCloseSort}
            books={books}
            setBooks={setBooks}
          />
        </Grid>
        <Grid
          className="content-padding"
          sx={{
            paddingBottom: "20px",
            paddingTop: "44px",
            paddingRight: "32px",
            paddingLeft: "32px",
          }}
        >
          {books.length === 0 ? (
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }} >
              <img src={noResult} alt="No results found" />
            </Grid>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ height: "22px", color: "#667085" }}>
                    <TableCell sx={{ color: "#667085" }}>
                      <Typography variant="p2Medium">Name</Typography>
                    </TableCell>
                    <TableCell sx={{ color: "#667085", fontSize: "16px" }}>Created by</TableCell>
                    <TableCell sx={{ color: "#667085", fontSize: "16px" }}>Subjects</TableCell>
                    <TableCell sx={{ color: "#667085", fontSize: "16px" }}>Grade</TableCell>
                    <TableCell sx={{ color: "#667085", fontSize: "16px" }}>Date</TableCell>
                    <TableCell sx={{ color: "#667085", fontSize: "16px" }}>Status</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.map((book, index) => (
                    <TableRow sx={{ height: "77px" }} key={index}>
                      <TableCell component="th" scope="row">
                        <Typography variant="p2Regular" color="#0B4DC1">
                          {book.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="p2Medium" color="#344054">
                          {book.userName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {book.subjectNames}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="p2Medium" sx={{ padding: "32px 0px" }}>
                          <Typography sx={{ padding: "6px 12px", borderRadius: "6px", textTransform: "none" }}>
                            {book.grade}
                          </Typography>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="p2Medium" sx={{ padding: "32px 0px" }} >
                          <Typography
                            sx={{
                              padding: "6px 12px",
                              borderRadius: "6px",
                              textTransform: "none",
                              color: "#344054"
                            }}>
                            {new Date(book.CreatedAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                          </Typography>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          sx={{
                            textTransform: "none",
                            ...(book.status === 'draft' && {
                              backgroundColor: '#0B4DC1', color: 'white', width: "110px", borderRadius: "8px", '&:active, &:focus, &:hover': {
                                backgroundColor: '#0B4DC1',
                                color: "white"
                              }
                            }),
                            ...(book.status === 'for_approval' && {
                              backgroundColor: '#CFDFFC', color: '#021431', width: "140px", borderRadius: "8px", '&:active, &:focus, &:hover': {
                                backgroundColor: '#CFDFFC',
                                color: "#021431"
                              }
                            }),
                            ...(book.status === 'published' && {
                              backgroundColor: 'white', color: '#0B4DC1', '&:active, &:focus, &:hover': {
                                backgroundColor: 'white',
                                color: "#0B4DC1"
                              }
                            }),


                          }}
                          // disableElevation
                          disableRipple
                        >
                          {book.status === 'draft' ? 'Start review' :
                            book.status === 'for_approval' ? 'Continue review' :
                              book.status === 'published' ? 'View book' :
                                book.status
                          }
                        </Button>
                      </TableCell>
                    </TableRow>

                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
      <FilterModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        subjectNames={subjectNames} 
        setSubjectNames={setSubjectNames}
        grade={grade}
        setGrade={setGrade}
        setPage={setPage}
        author={author}
        setAuthor={setAuthor}
        status={status}
        setStatus={setStatus}

         />
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
export default Library;