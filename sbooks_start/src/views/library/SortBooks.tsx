import React from 'react';
import { Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import alignIcon from "../../assets/icons/fi_align-center.svg";

const SortBooks = ({ sortBy, setSortBy, handleClickSort, anchorElSort, openSort, handleCloseSort, books, setBooks }) => {
    const handleSort = (sortOption) => {
        setSortBy(sortOption);
        handleCloseSort();
    };
    return (
        <>
            <Button
                sx={{
                    display: "inline-flex",
                    padding: "0px 20px 0px 22px",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: "0",
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                    height: "44px",
                }}
                onClick={handleClickSort}
                aria-controls="long-menu"
                aria-haspopup="true"
            >
                <Typography variant="p2Medium" sx={{ display: "flex", alignItems: "center", gap: "8px" }} >
                    <Grid textTransform={"none"}>Sort</Grid>
                    <Grid>
                        <img src={alignIcon} style={{ paddingTop: "5px", width: "20px" }} alt="sort" />
                    </Grid>
                </Typography>
            </Button>
            <Menu
                id="long-menu"
                anchorEl={anchorElSort}
                open={openSort}
                onClose={handleCloseSort}
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
            >
                <MenuItem onClick={() => handleSort("newestFirst")}>Newest first</MenuItem>
                <MenuItem onClick={() => handleSort("oldestFirst")}>Oldest first</MenuItem>
                <MenuItem onClick={() => handleSort("recentlyModified")}>Recently modified</MenuItem>
                <MenuItem onClick={() => handleSort("oldestModified")}>Oldest modified</MenuItem>
                <MenuItem onClick={() => handleSort("titleAtoZ")}>Name A to Z</MenuItem>
                <MenuItem onClick={() => handleSort("titleZtoA")}>Name Z to A</MenuItem>

            </Menu>
        </>
    );
};

export default SortBooks;
