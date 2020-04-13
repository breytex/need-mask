import React, { useState, useEffect } from "react";
import {
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  isRequired?: boolean;
  defaultValue?: number;
  percision: number;
  step: number;
}

const MyNumberInput = (props: Props) => {
  const { name, isRequired, defaultValue, percision, step } = props;
  const { register, watch, unregister } = useFormContext();
  const defVal = watch(name) || defaultValue;
  const [value, setValue] = useState(defVal);

  useEffect(() => {
    register(name, { required: isRequired });
    return () => {
      unregister(name);
    };
  }, []);

  return (
    <NumberInput
      precision={percision}
      step={step}
      onChange={setValue}
      value={value}
    >
      <NumberInputField type="number" />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default MyNumberInput;
