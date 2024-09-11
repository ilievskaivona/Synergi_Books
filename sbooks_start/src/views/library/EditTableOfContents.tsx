import { ThemeProvider } from "@emotion/react";
import { Button, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DeleteIcon from "../../assets/icons/Delete.svg";
import EditIcon from "../../assets/icons/Edit.svg";
import PaperPlusIcon from "../../assets/icons/Paper Plus.svg";
import BooksIcon from "../../assets/icons/bookz.svg";
import MenuIcon from "../../assets/icons/fi_more-vertical.svg";
import MoveIcon from "../../assets/icons/fi_move.svg";
import theme from "../../themes/SBookTheme";
import Axios from "axios";
import { useParams } from "react-router-dom";


function EditTableOfContents() {
    const [anchorElChapter, setAnchorElChapter] = React.useState<null | HTMLElement>(null);
    const [anchorElLesson, setAnchorElLesson] = React.useState<null | HTMLElement>(null);
    const openChapter = Boolean(anchorElChapter);
    const openLesson = Boolean(anchorElLesson);
    const [bookDetails, setBookDetails] = useState<{ Description: string, Level: number, parent: number | null, sort: number, BookDetailsId: number, title: string, }[]>([]);
    const { title } = useParams();

    const handleClickChapter = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElChapter(event.currentTarget);
    };
    const handleCloseChapter = () => {
        setAnchorElChapter(null);
    };

    const handleClickLesson = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElLesson(event.currentTarget);
    };
    const handleCloseLesson = () => {
        setAnchorElLesson(null);
    };

 const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;

    if (type === "group" && source.droppableId === "chapters" && destination.droppableId === "chapters") {
        const reorderedData = [...chaptersWithLessons];

        const sourceIndex = source.index;
        const destinationIndex = destination.index;

        const [removedItem] = reorderedData.splice(sourceIndex, 1);
        reorderedData.splice(destinationIndex, 0, removedItem);

        setBookDetails(reorderedData);
    }
};


    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await Axios.get("http://0.0.0.0:3740/v1/bookDetails", {
                    headers: {
                        "x-api-key": "test"
                    }
                });
                setBookDetails(response.data);
                console.log("Book details", response.data);

            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };
        fetchBookDetails();
    }, []);

    const organizeBookDetails = (details) => {
        const organized = [];
        details.forEach((detail) => {
            if (detail.parent === null) {
                organized[detail.BookDetailsId] = { ...detail, lessons: [] };
            } else {
                if (organized[detail.parent]) {
                    organized[detail.parent].lessons.push(detail);
                }
            }
        });
        return organized;
    };

    const chaptersWithLessons = organizeBookDetails(bookDetails);

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="h3Bold"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "32px",
                    paddingTop: "30px",
                }}
            >
                Table of contents
            </Typography>
            <TableContainer sx={{ display: "flex", justifyContent: "center" }}>
                <Table
                    sx={{
                        display: "grid",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                    }}
                >
                    <DragDropContext onDragEnd={handleDragAndDrop}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#D0D5DD" }}>
                                <TableCell sx={{ textAlign: "left", width: "100%" }}>
                                  {title}
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <img src={EditIcon} style={{ width: "18px", height: "18px" }} alt="edit" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        <Droppable droppableId="chapters" type="group">

                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {chaptersWithLessons.map((chapter, index) => (
                                         <Draggable key={chapter.BookDetailsId} draggableId={chapter.BookDetailsId.toString()} index={index}>


                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <TableRow sx={{ backgroundColor: "#F2F4F7" }}>
                                                            <TableCell sx={{ width: "100%" }}>
                                                                {chapter.Description}
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    display: "flex",
                                                                    float: "right",
                                                                    textAlign: "right",
                                                                    gap: "8px",
                                                                }}
                                                            >
                                                                <Button>
                                                                    <img src={MoveIcon} alt="" />
                                                                </Button>
                                                                <div>
                                                                    <Button onClick={handleClickChapter}>
                                                                        <img src={MenuIcon} alt="menu" />
                                                                    </Button>
                                                                    <Menu
                                                                        MenuListProps={{
                                                                            "aria-labelledby": "long-menu",
                                                                        }}
                                                                        anchorEl={anchorElChapter}
                                                                        open={openChapter}
                                                                        onClose={handleCloseChapter}
                                                                    >
                                                                        <MenuItem key={"edit"} sx={{ gap: "8px" }}>
                                                                            <img src={EditIcon} alt="edit" />
                                                                            Edit
                                                                        </MenuItem>
                                                                        <MenuItem key={"new-chapter"} sx={{ gap: "8px" }}>
                                                                            <img src={BooksIcon} alt="" />
                                                                            Add new chapter
                                                                        </MenuItem>
                                                                        <MenuItem key={"new-lesson"} sx={{ gap: "8px" }}>
                                                                            <img src={PaperPlusIcon} alt="plus" />
                                                                            Add new lesson
                                                                        </MenuItem>
                                                                        <MenuItem key={"remove-chapter"} sx={{ gap: "8px" }}>
                                                                            <img src={DeleteIcon} alt="delete" />
                                                                            <Typography color="error600">
                                                                                Remove lesson
                                                                            </Typography>
                                                                        </MenuItem>
                                                                    </Menu>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                        {chapter.lessons.map((lesson, lessonIndex) => (
                                                            <TableRow
                                                                key={lesson.BookDetailsId}
                                                                sx={{
                                                                    display: "flex",
                                                                    backgroundColor: "#FFF",
                                                                }}
                                                            >
                                                                <TableCell
                                                                    sx={{
                                                                        display: "flex",
                                                                        width: "100%",
                                                                        paddingLeft: "30px",
                                                                        alignItems: "center",
                                                                    }}
                                                                >
                                                                    {lesson.Description}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        display: "flex",
                                                                        float: "right",
                                                                        textAlign: "right",
                                                                    }}
                                                                >
                                                                    <div>
                                                                        <Button onClick={handleClickLesson}>
                                                                            <img src={MenuIcon} alt="menu" />
                                                                        </Button>
                                                                        <Menu
                                                                            MenuListProps={{
                                                                                "aria-labelledby": "long-button",
                                                                            }}
                                                                            anchorEl={anchorElLesson}
                                                                            open={openLesson}
                                                                            onClose={handleCloseLesson}
                                                                        >
                                                                            <MenuItem key={"edit"} sx={{ gap: "8px" }}>
                                                                                <img src={EditIcon} alt="edit" />
                                                                                Edit
                                                                            </MenuItem>
                                                                            <MenuItem key={"add"} sx={{ gap: "8px" }}>
                                                                                <img src={PaperPlusIcon} alt="plus" />
                                                                                Add new lesson
                                                                            </MenuItem>
                                                                            <MenuItem key={"remove"} sx={{ gap: "8px" }}>
                                                                                <img src={DeleteIcon} alt="delete" />
                                                                                <Typography color="error600">
                                                                                    Remove lesson
                                                                                </Typography>
                                                                            </MenuItem>
                                                                        </Menu>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </TableBody>
                    </DragDropContext>
                    <TableFooter
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                            gap: "16px",
                            padding: "0px 24px",
                        }}
                    >
                        <TableCell sx={{ padding: "20px 0px", border: "0px" }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: "8px",
                                    borderColor: "#D0D5DD",
                                    width: "148px",
                                    height: "44px",
                                }}
                            >
                                <Typography variant="p2Regular" sx={{ textTransform: "none" }}>
                                    Return for edit
                                </Typography>
                            </Button>
                        </TableCell>
                        <TableCell sx={{ padding: "20px 0px", border: "0px" }}>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: "8px",
                                    backgroundColor: "#0B4DC1",
                                    width: "95px",
                                    height: "44px",
                                }}
                            >
                                <Typography
                                    variant="p2Regular"
                                    sx={{ textTransform: "none", color: "#FFFFFF" }}
                                >
                                    Publish
                                </Typography>
                            </Button>
                        </TableCell>
                    </TableFooter>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}

export default EditTableOfContents;
