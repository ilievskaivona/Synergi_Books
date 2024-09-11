import { Box, Button, Grid, Modal, Stack, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import fi_x from "../../assets/icons/fi_x.svg";

interface DeleteChapterModalProps {
    modalDeleteChapter: boolean,
    setModalDeleteChapter: Dispatch<SetStateAction<boolean>>
}

const DeleteChapterModal: React.FC<DeleteChapterModalProps>  = ({
    modalDeleteChapter,
    setModalDeleteChapter
}) => {
   // const [open, setOpen] = React.useState(false);

    return(
        <div>
            <Modal  
            open={modalDeleteChapter}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Box sx={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
                width: "484px",}}>
                    <Box sx={{
                    display: "flex",
                    bgcolor: "white",
                    borderRadius: "8px",
                    border: "1px solid #EAECF0",
                    boxShadow: 24,
                    flexDirection: "column",
                    p: 4,
                }}>
                        <Grid sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "12px",
                    }}>
                            <Grid container>
                            <Grid container justifyContent={"space-between"}>
                            <Typography
                                    variant="h5sSemiBold"
                                    sx={{paddingBottom: "12px"}}>
                                Delete this chapter
                                </Typography>
                                <Typography>
                                    <Button onClick={() => setModalDeleteChapter(false)}>
                                        <img src={fi_x} />
                                    </Button>
                                </Typography>
                                </Grid>
                                <Typography variant="p3Medium" sx={{ color: "neutral500" }}>
                                Are you sure you want to delete this chapter?
                                </Typography>
                                </Grid>
                            </Grid>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                                >
                                <Button 
                                variant="outlined"
                                sx={{
                                    borderRadius: "8px",
                                    borderColor: "#D0D5DD",
                                    width: "202px",
                                    backgroundColor: "white",
                                    color: "neutral900",
                                    textTransform: "none",
                                    paddingRight: "16px",
                                }}
                                onClick={() => setModalDeleteChapter(false)}>
                                <Typography variant="p2Medium" >Cancel</Typography>
                                </Button>
                                <Button variant="outlined"
                                sx={{
                                    borderRadius: "8px",
                                    width: "202px",
                                    backgroundColor: "error600",
                                    height: "44px",
                                    textTransform: "none",
                                }}>
                                    <Typography variant="p2Medium" color="white">
                             
                                    Delete</Typography>
                                </Button>
                          </Stack>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
export default DeleteChapterModal

