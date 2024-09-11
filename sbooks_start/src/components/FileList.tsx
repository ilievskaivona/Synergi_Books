import {
  Grid,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from "@mui/material";
import React from "react";
import downloadIcon from "../assets/icons/fi_download.svg";

interface File {
  path: string;
  name: string;
  size: number;
}
interface FileListProps {
  files: File[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {

  const [downloadLink, setDownloadLink] = React.useState<string | null>(null);
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let newdate = month + "." + day + "." + year;


  const handleDownload = (file: File) => {
    const fileContent = "Replace this with your file content";

    const blob = new Blob([fileContent], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    setDownloadLink(url);

    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();

    URL.revokeObjectURL(url);
    setDownloadLink(null);
  };
  
  return (
    <Grid>
      <Grid container>
        <Typography variant="h6SemiBold" sx={{ color: "neutral700" }}>
          Uploaded files
        </Typography>
        <TableContainer>
          <Table
            sx={{
              width: "100%",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "neutral500" }}>Name</TableCell>
                <TableCell sx={{ color: "neutral500" }}>Uploaded by</TableCell>
                <TableCell sx={{ color: "neutral500" }}>Size</TableCell>
                <TableCell sx={{ color: "neutral500" }}>Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file) => {
                return (
                  <TableRow key={file.path}>
                    <TableCell>{file.name}</TableCell>
                    <TableCell sx={{ color: "neutral500" }}>
                      Uploaded by
                    </TableCell>
                    <TableCell sx={{ color: "neutral500" }}>
                      {file.size && (file.size / 1000000).toFixed(2)} MB
                    </TableCell>
                    <TableCell sx={{ color: "neutral500" }}>
                    {newdate &&  `${(day < 10 ? '0' + day : day)}.${(month < 10 ? '0' + month : month)}.${year}`}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDownload(file)}
                        variant="outlined"
                        sx={{
                          padding: "10px 20px 10px 20px",
                          borderColor: "neutral300",
                        }}
                      >
                        <img src={downloadIcon} alt="download-icon" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {downloadLink && (
              <a
                style={{ display: "none" }}
                href={downloadLink}
                download="downloaded-file.txt"
              >
                Download Link
              </a>
            )}
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
export default FileList;
