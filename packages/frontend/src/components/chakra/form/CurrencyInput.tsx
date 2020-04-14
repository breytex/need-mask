import React, {
  CSSProperties,
  FC,
  KeyboardEvent,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Input } from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";

interface Props {
  max?: number;
  onValueChange: (value: number) => void;
  style?: CSSProperties;
  value: number;
}

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const DELETE_KEY_CODE = 8;

const CurrencyInputRaw: FC<Props> = ({
  max = Number.MAX_SAFE_INTEGER,
  onValueChange,
  style = {},
  value,
}) => {
  const valueAbsTrunc = Math.trunc(Math.abs(value));
  if (
    value !== valueAbsTrunc ||
    !Number.isFinite(value) ||
    Number.isNaN(value)
  ) {
    throw new Error(`invalid value property`);
  }
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>): void => {
      const { key, keyCode } = e;
      if (
        (value === 0 && !VALID_FIRST.test(key)) ||
        (value !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
      ) {
        return;
      }
      const valueString = value.toString();
      let nextValue: number;
      if (keyCode !== DELETE_KEY_CODE) {
        const nextValueString: string =
          value === 0 ? key : `${valueString}${key}`;
        nextValue = Number.parseInt(nextValueString, 10);
      } else {
        const nextValueString = valueString.slice(0, -1);
        nextValue =
          nextValueString === "" ? 0 : Number.parseInt(nextValueString, 10);
      }
      if (nextValue > max) {
        return;
      }
      onValueChange(nextValue);
    },
    [max, onValueChange, value]
  );
  const handleChange = useCallback(() => {
    // DUMMY TO AVOID REACT WARNING
  }, []);
  const valueDisplay = (value / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <Input
      inputMode="numeric"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      style={style}
      value={valueDisplay}
      size="lg"
    />
  );
};

export const CurrencyInput = (props) => {
  const { name, min } = props;
  const { watch, setValue, register, unregister } = useFormContext();
  const value = parseInt(watch(name)) || 0;

  const setValueFn = (value) => {
    if (isNaN(value) || value < 0) {
      setValue(name, 0);
    }
    setValue(name, value);
  };

  useEffect(() => {
    register(name, { required: true, min });

    return () => unregister(name);
  }, []);

  return <CurrencyInputRaw value={value} onValueChange={setValueFn} />;
};
