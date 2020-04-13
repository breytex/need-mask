import React, { useState, useRef } from "react";

type FileUploadResponse = {
  fileName: string;
};
type IUseFileUpload = (
  maxFileSizeMB?: number,
  defaultValue?: string
) => {
  onChange: any;
  isLoading: boolean;
  error: string;
  fileName: string;
  reset: () => void;
};

const useFileUpload: IUseFileUpload = (
  maxFileSizeMB = 5,
  defaultValue = ""
) => {
  const [fileName, setFileName] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File): Promise<void> {
    if (file.size > 1024 * 1024 * maxFileSizeMB) {
      return setError(`Size limit exceeded ${maxFileSizeMB}MB`);
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res: FileUploadResponse = await fetch("/api/spaces/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    setFileName(res.fileName);
    setIsLoading(false);
  }

  const reset = () => setFileName("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    upload(event.target.files[0]);
  return { onChange, isLoading, error, fileName, reset };
};

export default useFileUpload;
