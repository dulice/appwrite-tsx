import { mdiImagePlus } from "@mdi/js";
import Icon from "@mdi/react";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type fileUpload = {
  fieldChange: (file: File[]) => void;
  mediaUrl?: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: fileUpload) => {
  
  const [fileUrl, setFileUrl] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    fieldChange(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".svg"] },
  });
  return (
    <div {...getRootProps()}>
      <input type="file" {...getInputProps()} />
      {fileUrl ? (
        <div className="bg-slate-700 rounded-md p-4">
          <img src={fileUrl} alt="" />
        </div>
      ) : mediaUrl ? (
        <div className="bg-slate-700 rounded-md p-4">
          <img src={mediaUrl} alt="" />
          <p className="bg-slate-800 p-2 mt-4 text-center">Click here to select or change your photo.</p>
        </div>
      ) : (
        <div className="bg-slate-700 rounded-md p-4 flex flex-col justify-center items-center">
          <Icon path={mdiImagePlus} size={5} />
          <Button>Select from Computer.</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
