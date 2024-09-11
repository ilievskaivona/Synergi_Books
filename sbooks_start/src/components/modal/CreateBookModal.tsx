import { Box, Grid, Modal, Select, Button, MenuItem, Typography, FormControl, OutlinedInput, SelectChangeEvent } from "@mui/material";
import fi_x from "../../assets/icons/fi_x.svg";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Axios from "axios";

interface AddAttributiorsModalProps {
    modalOpenCreateBook: boolean;
    setModalOpenCreateBook: Dispatch<SetStateAction<boolean>>;
    fetchBooks: () => void;
}

const CreateBookModal: React.FC<AddAttributiorsModalProps> = ({
    modalOpenCreateBook,
    setModalOpenCreateBook,
    fetchBooks
}) => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [selectedGrade, setSelectedGrade] = useState<string>('');
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');

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

    const handleGradeChange = (event: SelectChangeEvent<string>) => {
        setSelectedGrade(event.target.value);
    };

    const handleSubjectChange = (event: SelectChangeEvent<string>) => {
        setSelectedSubject(event.target.value);
    };

    const handleCreateBook = async () => {
        try {
            const response = await Axios.post("http://0.0.0.0:3740/v1/book", {
                author: author,
                title: bookName,
                grade: selectedGrade,
                difficulty: 'beginner',
                status: 'draft',
                user: 1
            }, {
                headers: {
                    "x-api-key": "test"
                }
            });
            const bookSubjectData = {
                subjectId: selectedSubject, 
                bookId: response.data.BookId,
            };
    
             await Axios.post("http://0.0.0.0:3740/v1/bookSubject", bookSubjectData, {
                headers: {
                    "x-api-key": "test",
                    "Content-Type": "application/json", 
                }
            });
            setModalOpenCreateBook(false);
            fetchBooks();
        } catch (error) {
            console.error("Error creating book:", error);
        }
    };

    return (
        <Modal open={modalOpenCreateBook} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box
                sx={{
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    top: "50%",
                    left: "50%",
                    width: "484px",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        bgcolor: "white",
                        borderRadius: "8px",
                        border: "1px solid",
                        borderColor: "neutral200",
                        boxShadow: 24,
                        flexDirection: "column",
                        p: 4,
                    }}>
                    <Box display={"grid"}>
                        <Grid container justifyContent={"space-between"}>
                            <Typography variant="h5sSemiBold" sx={{ display: "flex", }}>
                                Create Book
                            </Typography>
                            <Typography>
                                <Button onClick={() => setModalOpenCreateBook(false)}>
                                    <img src={fi_x} alt="x" />
                                </Button>
                            </Typography>
                            <Grid sx={{ paddingBottom: "32px" }}>
                                <Typography variant="p3Medium" sx={{ color: "#667085" }}>
                                    Before you start creating new book, you need to fill some information about the book.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="p1Medium" sx={{ paddingBottom: "12px", color: "#101828" }} >
                            Author
                        </Typography>
                        <form>
                            <FormControl fullWidth sx={{ paddingBottom: "12px" }}>
                                <OutlinedInput
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    sx={{ borderRadius: "8px", height: "44px", backgroundColor: "#F9FAFB", color: "#667085" }}
                                />
                            </FormControl>
                        </form>
                        <Typography variant="p2Medium" sx={{ paddingBottom: "12px" }}>
                            Book Name
                        </Typography>
                        <form>
                            <FormControl fullWidth sx={{ paddingBottom: "12px" }}>
                                <OutlinedInput
                                    value={bookName}
                                    onChange={(e) => setBookName(e.target.value)}
                                    sx={{ borderRadius: "8px", height: "44px", backgroundColor: "#F9FAFB", color: "#667085" }}
                                />
                            </FormControl>
                        </form>
                        <Typography variant="p2Medium" sx={{ paddingBottom: "12px" }}>
                            Subjects
                        </Typography>
                        <FormControl fullWidth sx={{ paddingBottom: "12px" }}>
                            <Select
                                displayEmpty
                                value={selectedSubject}
                                onChange={handleSubjectChange}
                                sx={{ borderRadius: "8px", height: "44px", backgroundColor: "#F9FAFB", color: "#667085" }} >
                                <MenuItem value="" disabled sx={{ color: "#667085" }}>
                                    Select Subject
                                </MenuItem>
                                {subjects.map((subject, index) => (
                                    <MenuItem key={index} value={subject.SubjectId}>
                                        {subject.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography>
                            Grades
                        </Typography>
                        <FormControl fullWidth sx={{ paddingBottom: "12px" }}>
                            <Select
                                displayEmpty
                                value={selectedGrade}
                                onChange={handleGradeChange}
                                sx={{ borderRadius: "8px", height: "44px", color: "#667085", backgroundColor: "#F9FAFB" }} >
                                <MenuItem value="" disabled>
                                    Select Grade
                                </MenuItem>
                                {Object.keys(grades).map((gradeKey) => (
                                    <MenuItem key={gradeKey} value={grades[gradeKey]}>
                                        {grades[gradeKey]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Grid sx={{ paddingTop: "32px" }}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleCreateBook}
                                sx={{
                                    textTransform: "none",
                                    padding: "10px 20px",
                                    backgroundColor: "primary600",
                                    borderRadius: "8px",
                                }}
                            >
                                <Typography variant="p2Medium" color="white">
                                    Start Creating
                                </Typography>
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateBookModal;
