import React, { useEffect } from "react";
import useFileUpload from "../../hooks/useFileUpload";
import { Input, Spinner } from "@chakra-ui/core";
import Error from "./form/Error";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  isRequired: boolean;
}

const UploadInput = ({ name, isRequired }: Props) => {
  const { onChange, error, isLoading, fileName } = useFileUpload(5);
  const { register, setValue, unregister } = useFormContext();

  useEffect(() => {
    register(name, { required: isRequired });
    return () => unregister(name);
  }, []);

  useEffect(() => {
    if (!fileName || fileName === "") return;
    setValue(name, fileName);
  }, [fileName]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <Input type="file" onChange={onChange} />
      {error && <Error>{error}</Error>}
    </React.Fragment>
  );
};

export default UploadInput;
