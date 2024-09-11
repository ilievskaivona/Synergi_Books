import {
    Box,
    Button,
    FormControl,
    Grid,
    Modal,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { Dispatch, SetStateAction } from "react";
  import fi_x from "../../assets/icons/fi_x.svg";

  interface AddTagsModalProps {
        modalOpenAddTags: boolean
        setModalOpenAddTags: Dispatch<SetStateAction<boolean>>
  }

const AddTagsModal: React.FC<AddTagsModalProps> = ({
    modalOpenAddTags,
    setModalOpenAddTags
}) => {


    return(
        <div>
            <Modal
                open={modalOpenAddTags}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box    sx={{
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                        top: "50%",
                        left: "50%",
                        width: "484px",
                        }}>
                    <Box sx={{
                        display: "flex",
                        bgcolor: "white",
                        borderRadius: "8px",
                        border: "1px solid #EAECF0",
                        boxShadow: 24,
                        flexDirection: "column",
                        p: 4,
                    }}>
                        <Box display="grid">
                        <Grid container justifyContent={"space-between"}>
                        <Typography
                            variant="h5sSemiBold"
                            sx={{ display: "flex", paddingBottom: "12px" }}
                            >
                            Add Tag
                        </Typography>
                        <Typography>
                        <Button onClick={() => setModalOpenAddTags(false)}>
                        <img src={fi_x}></img>
                         </Button>
                         </Typography>
                        </Grid>
                        <FormControl sx={{ borderRadius: "8px" }}>
                            <TextField
                                required
                                id="name"
                                placeholder="Write text here..."
                                name="text"
                                InputProps={{
                                    sx: {
                                        fontFamily: "Plus Jakarta Sans",
                                        fontSize: "16px",
                                        fontStyle: "normal",
                                        color: "neutral500",
                                        fontWeight: "400",
                                        lineHeight: "24px",
                                        letterSpacing: "-0.08px",
                                        borderRadius: "8px",
                                        height: "218px",
                                        alignItems: "flex-start",
                                      },
                                }}
                                sx={{ paddingBottom: "24px" }}
                                >
                            </TextField>
                            {/* <Grid
                                container
                                className="buttonPositionStyle"
                                sx={{
                                justifyContent: "center",
                                paddingTop: "32px",
                                display: "inline-block",
                                }}
                            > */}
                            <Typography variant="p2Medium">
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                    height: "44px",
                                    width: "420px",
                                    padding: "10px 20px",
                                    backgroundColor: "var(--primary-600-main, #0B4DC1)",
                                    textTransform: "none",
                                    borderRadius: "8px",
                                    color: "white",
                                    borderColor: "neutral300",
                                    }}
                                    onClick={() => setModalOpenAddTags(false)}
                                >
                                    Add tag
                                </Button>
                                </Typography>
                                {/* </Grid> */}
                        </FormControl>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
export default AddTagsModal;

