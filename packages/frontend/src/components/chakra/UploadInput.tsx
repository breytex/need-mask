import React, { useEffect, useState } from "react";
import useFileUpload from "../../hooks/useFileUpload";
import { Flex, Text, Box, Button } from "@chakra-ui/core";
import Error from "./form/Error";
import { useFormContext } from "react-hook-form";
import styled from "@emotion/styled";

interface Props {
  name: string;
  isRequired?: boolean;
  description: string;
}

const UploadStyleWrapper = styled(Box)`
  [type="file"] {
    height: 0;
    overflow: hidden;
    width: 0;
  }

  [type="file"] + label {
    background: #6892d5;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: inherit;
    font-weight: 600;
    outline: none;
    padding: 0.5rem 2rem;
    position: relative;
    transition: all 0.3s;
    vertical-align: middle;

    &:hover {
      background-color: #4573b4;
    }
  }
`;

const UploadInput = ({ name, isRequired = false, description }: Props) => {
  const { register, setValue, unregister, watch } = useFormContext();
  const fileIdField = `${name}-id`;
  let defaultValue = watch(name);
  let defaultValueFileId = watch(fileIdField);
  const [fileId, setFileId] = useState(defaultValueFileId);
  const { onChange, error, isLoading, fileName, reset } = useFileUpload(
    5,
    defaultValue
  );
  useEffect(() => {
    register(name, { required: isRequired });
    register(fileIdField);
    return () => {
      unregister(name);
      unregister(fileIdField);
    };
  }, []);

  useEffect(() => {
    setValue(name, fileName || "");
  }, [fileName]);

  useEffect(() => {
    setValue(fileIdField, fileId);
  }, [fileId]);

  if (isLoading) {
    return (
      <Flex h="40px">
        <Button variantColor="blue" w="153px" isLoading>
          Choose a file
        </Button>
      </Flex>
    );
  }

  const resetFn = () => {
    const input = confirm("Do you really want to delete this file?");
    if (input) {
      reset();
      setFileId("");
    }
  };
  const cleanFileName = fileName.split("/").splice(-1)[0];
  return (
    <React.Fragment>
      {fileName && (
        <Flex>
          <Button
            variantColor="red"
            variant="outline"
            leftIcon="delete"
            onClick={resetFn}
          >
            Delete
          </Button>
          <Text ml="2" mt="6px">
            {cleanFileName}
          </Text>
        </Flex>
      )}
      {!fileName && (
        <div>
          <UploadStyleWrapper>
            <input type="file" id={`file-${name}`} onChange={onChange} />
            <label htmlFor={`file-${name}`}>Choose a file</label>
          </UploadStyleWrapper>
          <Text fontSize="lg" my="5px" w="100%">
            {description}
          </Text>
        </div>
      )}
      {error && <Error>{error}</Error>}
    </React.Fragment>
  );
};

export default UploadInput;
