import {
    Box,
    Grid,
    Modal,
    Select,
    Button,
    MenuItem,
    Typography,
    FormControl,
    OutlinedInput,
    SelectChangeEvent,
} from "@mui/material";
import fi_x from "../../assets/icons/fi_x.svg";
import React, { Dispatch, SetStateAction } from "react";

interface AddAttributiorsModalProps {
    modalOpenAddAttributiors: boolean;
    setModalOpenAddAttributiors: Dispatch<SetStateAction<boolean>>;
}

const AddAttributiorsModal: React.FC<AddAttributiorsModalProps> = ({
    modalOpenAddAttributiors,
    setModalOpenAddAttributiors
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
            open={modalOpenAddAttributiors}
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
                        border: "1px solid",
                        borderColor: "neutral200",
                        boxShadow: 24,
                        flexDirection: "column",
                        p: 4,
                    }}
                >
                    <Box display={"grid"}>
                        <Grid container justifyContent={"space-between"}>
                            <Typography
                                variant="h5sSemiBold"
                                sx={{ display: "flex", paddingBottom: "32px" }}
                            >
                                Add attribution
                            </Typography>
                            <Typography>
                                <Button onClick={() => setModalOpenAddAttributiors(false)}>
                                    <img src={fi_x} />
                                </Button>
                            </Typography>
                        </Grid>
                        <Typography
                            variant="p2Medium"
                            sx={{ paddingBottom: "12px", color: "neutral900" }}
                        >
                            Role
                        </Typography>
                        <FormControl fullWidth sx={{ paddingBottom: "24px" }}>
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
                        <Typography variant="p2Medium" sx={{ paddingBottom: "12px" }}>
                            Name
                        </Typography>
                        <form>
                            <FormControl fullWidth>
                                <OutlinedInput
                                    sx={{ borderRadius: "8px", height: "44px" }}
                                    placeholder="Gligor Dachevski"
                                />
                            </FormControl>
                        </form>
                        <Grid sx={{ paddingTop: "32px" }}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    padding: "10px 20px",
                                    backgroundColor: "primary600",
                                    borderRadius: "8px",
                                }}
                            >
                                <Typography variant="p2Medium" color="white">
                                    Add attribution
                                </Typography>
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddAttributiorsModal;