import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography } from "@mui/material";
import deleteIcon from "../../assets/icons/Delete.svg";
import editIcon from "../../assets/icons/Edit.svg";
import moreVertical from "../../assets/icons/fi_more-vertical.svg";
import plus from "../../assets/icons/fi_plus.svg";
import NavbarWrapper from "../../components/nav/NavbarWrapper";
import theme from "../../themes/SBookTheme";
import axios from "axios";
import CreateBookModal from "../../components/modal/CreateBookModal";
import { useNavigate } from "react-router-dom";

const options = [
  { label: "Edit", icon: editIcon },
  { label: "Delete book", icon: deleteIcon },
];

const MyBooks: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [totalBooks, setTotalBooks] = useState(0); 
  let navigate = useNavigate()


  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get("http://0.0.0.0:3740/v1/books", {
        headers: {
          "x-api-key": "test"
        },
        params: {
          page,
          pageSize,
        }
      });
      setBooks(response.data.books);
      setTotalBooks(response.data.totalBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, [page, pageSize]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    if (option === "Edit") {
        navigate('review'); 
    } else if (option === "Delete book") {
        // Handle delete logic here
      }
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const [modalOpenCreateBook, setModalOpenCreateBook] = useState(false);
  const totalPages = Math.ceil(totalBooks / pageSize);
  const isLastPage = page === totalPages;

  return (
    <ThemeProvider theme={theme}>
      <NavbarWrapper />
      <Grid id="adminPanelGrid" className="bodyCenter" sx={{ paddingLeft: "282px", overflowX: "hidden" }}>
        <Grid
          className="content-padding"
          sx={{
            paddingBottom: "20px",
            paddingTop: "44px",
            paddingLeft: "32px",
            paddingRight: "32px"
          }}
        >
          <Typography
            variant="p2Medium"
            sx={{
              paddingTop: "32px",
              paddingRight: "32px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              sx={{
                height: "44px",
                width: "191px",
                padding: "10px 20px",
                backgroundColor: "#0B4DC1",
                textTransform: "none",
                borderRadius: "8px",
                justifyContent: "center",
                alignItems: "center",
                display: "inline-flex",
              }}
              startIcon={ <img src={plus} style={{ width: "16px", height: "16px" }} alt="" />}
              onClick={() => setModalOpenCreateBook(true)}>
              Create new book
            </Button>
            <CreateBookModal
              modalOpenCreateBook={modalOpenCreateBook}
              setModalOpenCreateBook={setModalOpenCreateBook}
              fetchBooks={fetchBooks}
            />
          </Typography>
          <Typography variant="h5Bold">My books</Typography>
          <TableContainer sx={{overflowY: "hidden"}}>
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
                  <TableCell sx={{ color: "#475467" }}>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book, index) => (
                  <TableRow key={index} sx={{ height: "77px" }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="p1SemiBold" color="primary600">
                        {book.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6sMedium" color="neutral700">
                        {book.userName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p2Medium" sx={{ padding: "32px 0px" }}>
                        {book.subjectNames}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p2Medium" sx={{ padding: "32px 0px",}}>
                          {book.grade}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p2Medium" sx={{padding: "32px 0px",}}>
                          {new Date(book.CreatedAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p3Medium" sx={{ padding: "32px 0px",}}>
                        <Typography
                          sx={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            textTransform: "none",
                            textAlign: "center",
                            color:
                              book.status === "published"
                                ? "#027A48"
                                : book.status === "draft"
                                ? "#B42318"
                                : book.status === "for_approval"
                                ? "#101828"
                                : "#101828",
                            backgroundColor:
                              book.status === "published"
                                ? "#D1FADF"
                                : book.status === "draft"
                                ? "#FEE4E2"
                                : book.status === "for_approval"
                                ? "#F2F4F7"
                                : "#F2F4F7",
                          }}
                        >
                          {book.status}
                        </Typography>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <div>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <img src={moreVertical} alt="More" />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                        >
                          {options.map((option) => (
                            <MenuItem
                              key={option.label}
                              selected={option.label === "Pyxis"}
                              onClick={() => handleClose(option.label)}
                              sx={{ gap: "8px" }}
                            >
                              <img src={option.icon} alt={option.label} />
                              {option.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      </div>
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

export default MyBooks;
