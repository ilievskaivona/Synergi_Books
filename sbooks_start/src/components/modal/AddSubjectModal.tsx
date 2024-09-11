import {
    Box,
    Grid,
    Modal,
    Select,
    Button,
    MenuItem,
    Typography,
    FormControl,
    SelectChangeEvent,
} from "@mui/material";
import fi_x from "../../assets/icons/fi_x.svg";
import React, { Dispatch, SetStateAction } from "react";

interface AddSubjectModalProps {
    modalOpenAddSubject: boolean;
    setModalOpenAddSubject: Dispatch<SetStateAction<boolean>>;
}

const AddSubjectModal: React.FC<AddSubjectModalProps> = ({
    modalOpenAddSubject,
    setModalOpenAddSubject,
}) => {
    const [open, setOpen] = React.useState(false);

    const [role, setSubject] = React.useState<string | number>(10);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = (event: SelectChangeEvent<typeof role>) => {
        setSubject(event.target.value);
    };
    return (
        <Modal
            open={modalOpenAddSubject}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    top: "50%",
                    left: "50%",
                    width: "484px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        bgcolor: "white",
                        borderRadius: "8px",
                        border: "1px solid #EAECF0",
                        boxShadow: 24,
                        flexDirection: "column",
                        p: 4,
                    }}
                >
                    <Box display={"grid"}>
                        <Grid container justifyContent={"space-between"}>
                            <Typography
                                variant="h5sSemiBold"
                                sx={{ display: "flex", paddingBottom: "15px" }}
                            >
                                Add subject
                            </Typography>
                            <Typography>
                                <Button onClick={() => setModalOpenAddSubject(false)}>
                                    <img src={fi_x} />
                                </Button>
                            </Typography>
                        </Grid>
                        <Typography
                            variant="p2Medium"
                            sx={{ paddingBottom: "12px", color: "neutral900" }}
                        >
                            Subject
                        </Typography>
                        <FormControl fullWidth>
                            <Select
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={role}
                                onChange={handleChange}
                                sx={{ borderRadius: "8px", height: "44px" }}
                            >
                                <MenuItem value={10}>
                                    <Typography color={"neutral500"}>Biology</Typography>
                                </MenuItem>
                                <MenuItem value={20}>
                                    <Typography color={"neutral500"}>Music</Typography>
                                </MenuItem>
                                <MenuItem value={30}>
                                    <Typography color={"neutral500"}>Math</Typography>
                                </MenuItem>
                                <MenuItem value={40}>
                                    <Typography color={"neutral500"}>Physics</Typography>
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <Grid sx={{ paddingTop: "32px" }}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    padding: "10px 20px",
                                    backgroundColor: "#0B4DC1",
                                    borderRadius: "8px",
                                }}
                            >
                                <Typography variant="p2Medium" color="white">
                                    Add subject
                                </Typography>
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddSubjectModal;