import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";
import { debounce } from "lodash";
interface Props {
  name: string;
  isRequired?: boolean;
  defaultValue?: number;
  step: number;
  min: number;
}

const MyNumberInput = (props: Props) => {
  const { name, min, step, defaultValue } = props;
  const {
    register,
    watch,
    unregister,
    setValue,
    triggerValidation,
  } = useFormContext();
  const defVal = watch(name) || defaultValue;
  const [value, setInternalValue] = useState(defVal);
  const currentValue = useRef();

  useEffect(() => {
    register(name, { min });
    return () => {
      unregister(name);
    };
  }, []);

  const setCombinedValue = (value) => {
    setInternalValue(value);
    currentValue.current = value;
  };

  const updateState = useCallback(
    debounce(() => {
      setValue(name, currentValue.current);
      triggerValidation(name);
    }, 800),
    []
  );

  const setInternalValueFn = (value) => {
    if (isNaN(value) || value < 0) {
      setCombinedValue(0);
      return;
    }
    setCombinedValue(value);
  };

  return (
    <NumberInput
      min={min}
      defaultValue={defaultValue}
      step={step}
      onChange={setInternalValueFn}
      keepWithinRange={true}
      value={value}
      size="lg"
      onBlur={updateState}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default MyNumberInput;
