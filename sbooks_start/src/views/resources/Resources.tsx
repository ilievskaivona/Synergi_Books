import React from "react";
import FileList from "../../components/FileList";
import FileUpload from "../../components/FileUpload";

const Resources: React.FC = () => {
  const [files, setFiles] = React.useState([]);

  return (
    <>
      <FileUpload
        uploadedFiles={(acceptedFiles: any) => {
          setFiles(acceptedFiles);
        }}
      />
      <FileList files={files} />
    </>
  );
};

export default Resources;
