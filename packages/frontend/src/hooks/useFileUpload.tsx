import React, { useState, useRef } from "react";

type FileErrors = Array<{
  name: string;
  message: string;
}> | void;

type FileUploadResponse = any;

type ICheckForErrors = () => FileErrors;
type IUpload = () => Promise<{
  errors: FileErrors | void;
  data: FileUploadResponse | void;
}>;
type IUseFileUpload = (props?: {}) => {
  Input: JSX.Element;
  isProcessing: boolean;
  checkForErrors: ICheckForErrors;
  upload: IUpload;
};

const readFile = (file: Blob) =>
  new Promise(async (resolve: (res: string | ArrayBuffer) => void, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reader.abort();
      reject(reader.result);
    };
  });

const useFileUpload: IUseFileUpload = (props = {}) => {
  const inputElement = useRef(
    <input
      type="file"
      onChange={({ target }) => setFiles(Array.from(target.files))}
      {...props}
    ></input>
  );
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const checkForErrors: ICheckForErrors = () => {
    const fileArray = files;
    const tooLargeFiles = fileArray
      .filter((file) => file.size > 1024 * 1024 * 5)
      .map(({ name }) => ({ name, message: "Size limit exceeded 1MB" }));
    if (tooLargeFiles.length > 0) {
      return tooLargeFiles;
    }
    return;
  };

  const upload: IUpload = () =>
    new Promise(async (resolve) => {
      setIsProcessing(true);
      const errors = await checkForErrors();
      if (errors) return resolve({ errors, data: undefined });

      const buffers = [];
      for (const file of files) {
        if (file.size > 1024 * 1024) continue;
        const res = await readFile(file);
        buffers[file.name] = res;
        buffers.push(res);
      }
      const responses = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const res: Response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        }).then((res) => res.json());
        responses.push(res);
      }
      setIsProcessing(false);
      resolve({ errors: undefined, data: responses });
    });
  return { Input: inputElement.current, isProcessing, checkForErrors, upload };
};

export default useFileUpload;
