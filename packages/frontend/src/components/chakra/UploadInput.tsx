import React, { useEffect } from "react";
import useFileUpload from "../../hooks/useFileUpload";
import { Flex, Text, Box, Button } from "@chakra-ui/core";
import Error from "./form/Error";
import { useFormContext } from "react-hook-form";
import styled from "@emotion/styled";

interface Props {
  name: string;
  isRequired: boolean;
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

const UploadInput = ({ name, isRequired }: Props) => {
  const { onChange, error, isLoading, fileName, reset } = useFileUpload(5);
  const { register, setValue, unregister } = useFormContext();

  useEffect(() => {
    register(name, { required: isRequired });
    return () => unregister(name);
  }, []);

  useEffect(() => {
    setValue(name, fileName || "");
  }, [fileName]);

  if (isLoading) {
    return (
      <Flex h="40px">
        <Button variantColor="blue" w="153px" isLoading>
          choose a file
        </Button>
      </Flex>
    );
  }

  const resetFn = () => {
    const input = confirm("Do you really want to delete this file?");
    if (input) {
      reset();
    }
  };

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
          <Text>{fileName}</Text>
        </Flex>
      )}
      {!fileName && (
        <Flex>
          <UploadStyleWrapper>
            <input type="file" id={`file-${name}`} onChange={onChange} />
            <label htmlFor={`file-${name}`}>choose a file</label>
          </UploadStyleWrapper>
        </Flex>
      )}
      {error && <Error>{error}</Error>}
    </React.Fragment>
  );
};

export default UploadInput;
