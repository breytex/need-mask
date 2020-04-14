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
  onBlur: () => void;
}

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const DELETE_KEY_CODE = 8;

const CurrencyInputRaw: FC<Props> = ({
  max = Number.MAX_SAFE_INTEGER,
  onValueChange,
  style = {},
  value,
  onBlur,
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
      const isDeleteKey =
        keyCode === DELETE_KEY_CODE || key === "Delete" || key === "Backspace";
      if (
        (value === 0 && !VALID_FIRST.test(key)) ||
        (value !== 0 && !VALID_NEXT.test(key) && !isDeleteKey)
      ) {
        return;
      }
      const valueString = value.toString();
      let nextValue: number;
      if (isDeleteKey) {
        const nextValueString = valueString.slice(0, -1);
        nextValue =
          nextValueString === "" ? 0 : Number.parseInt(nextValueString, 10);
      } else {
        const nextValueString: string =
          value === 0 ? key : `${valueString}${key}`;
        nextValue = Number.parseInt(nextValueString, 10);
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
      onBlur={onBlur}
      size="lg"
    />
  );
};

export const CurrencyInput = (props) => {
  const { name, min } = props;
  const { watch, setValue, register, unregister } = useFormContext();
  const value = parseInt(watch(name)) || 0;
  const [internalValue, setInternalValue] = useState(value);

  const onBlur = () => {
    if (isNaN(internalValue) || internalValue < 0) {
      setValue(name, "0");
    }
    setValue(name, "" + internalValue);
  };

  useEffect(() => {
    register(name, { required: true, min });

    return () => unregister(name);
  }, []);

  return (
    <CurrencyInputRaw
      onBlur={onBlur}
      value={internalValue}
      onValueChange={setInternalValue}
    />
  );
};
