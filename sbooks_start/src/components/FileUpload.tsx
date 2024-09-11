// import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import cloudIcon from "../assets/icons/cloud-download.svg";
import uploadIcon from "../assets/icons/fi_upload.svg";

import React, { useCallback } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

const FileUpload = ({ uploadedFiles }: any) => {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      uploadedFiles((prevFiles: FileWithPath[]) => [...prevFiles, ...acceptedFiles]);
    },
    [uploadedFiles]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
    multiple: true,
  });

  return (
    <Grid>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "8px",
            backgroundColor: "neutral50",
            border: "2px dashed",
            borderColor: "neutral200",
            outline: "none",
            transition: "border .24s ease-in-out",
            width: "40%",
            height: "228px",
          }}
        >
          <div style={{ display: "contents" }}   {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <img src={cloudIcon} alt="" />
            <Grid sx={{ paddingBottom: "4px" }}>
              <Typography color="neutral500">
                Click to upload
                <Typography
                  variant="p3SemiBold"
                  color={"neutral400"}
                  sx={{ marginLeft: "3px" }}
                >
                  or drag and drop
                </Typography>
              </Typography>
            </Grid>
            <Typography
              variant="captionMedium"
              sx={{
                color: "neutral500",
                display: "flex",
                justifyContent: "center",
                paddingBottom: "14px",
              }}
            >
              Max. File Size: 30MB
            </Typography>
            <Grid sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={open}
                component="label"
                variant="contained"
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "primary600",
                  padding: "8px 18px 8px 16px",
                  width: "125px",
                  height: "36px",
                }}
                startIcon={
                  <img
                    src={uploadIcon}
                    style={{ width: "16px", height: "16px" }}
                    alt="upload-icon"
                  />
                }
              >
                <Typography
                  variant="captionMedium"
                  sx={{ textTransform: "none", color: "white" }}
                >
                  Upload files
                </Typography>
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FileUpload;
