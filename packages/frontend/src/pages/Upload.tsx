import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Button } from "@chakra-ui/core";
import useFileUpload from "../hooks/useFileUpload";

const Upload: NextPage = () => {
  const { Input, checkForErrors, isProcessing, upload } = useFileUpload({
    multiple: true,
  });

  return (
    <div>
      {Input}
      <Button
        onClick={async () => {
          const responses = await upload();
          console.log(responses);
        }}
      >
        File Upload
      </Button>
    </div>
  );
};

export default Upload;
