import React, { useState, useEffect } from "react";
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Axios from "axios";

function Test() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await Axios.get("http://0.0.0.0:3740/v1/books", {
                    headers: {
                        "x-api-key": "test"
                    }
                });
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, []);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5">Books</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow key="header">
                                <TableCell>Title</TableCell>
                                <TableCell>Grade</TableCell>
                                <TableCell>Difficulty</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Created by</TableCell>
                                <TableCell>Updated by</TableCell>
                                <TableCell>Created at</TableCell>
                                <TableCell>Updated at</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book) => (
                                <TableRow key={book._id}>
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.grade}</TableCell>
                                    <TableCell>{book.difficulty}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.status}</TableCell>
                                    <TableCell>{book.createdBy}</TableCell>
                                    <TableCell>{book.updatedBy}</TableCell>
                                    <TableCell>{book.CreatedAt}</TableCell>
                                    <TableCell>{book.UpdatedAt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
export default Test;


