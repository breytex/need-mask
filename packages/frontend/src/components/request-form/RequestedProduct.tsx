import * as React from "react";
import { useState } from "react";
import { Box, Input } from "@chakra-ui/core/dist";
import FormLabel from "@chakra-ui/core/dist/FormLabel";
import Checkbox from "@chakra-ui/core/dist/Checkbox";
import Text from "@chakra-ui/core/dist/Text";
import { Field } from "../chakra/form/Field";
import { Product } from "../../types/Supplier";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  product: Product;
};

const RequestedProduct: React.FC<Props> = ({ index, product }) => {
  const [checked, check] = useState(false);
  const { register } = useFormContext();
  const name = `requestedProducts.data[${index}]`;

  return (
    <Box key={product.id}>
      <FormLabel>
        <Checkbox isChecked={checked} onChange={() => check((p) => !p)}>
          {product.title}{" "}
          <Text display="inline-block" fontSize="sm">
            ({product.productType.title})
          </Text>
        </Checkbox>
      </FormLabel>

      {checked && (
        <>
          <input
            type="hidden"
            name={`${name}.productId`}
            value={product.id}
            ref={register({ required: true })}
          />
          <Field key={product.id} name={product.id}>
            <Input
              type="number"
              name={`${name}.amount`}
              ref={register({ required: true })}
              step={1000}
              min={product.minOrderAmount}
              defaultValue={product.minOrderAmount}
            />
          </Field>
        </>
      )}
    </Box>
  );
};

export default RequestedProduct;
