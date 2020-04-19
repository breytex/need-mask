import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Box, Input, Checkbox, Text } from "@chakra-ui/core";
import { Field } from "../chakra/form/Field";
import { Select } from "@chakra-ui/core";
import { PrivacyCheckboxText } from "../privacyCheckboxes";
import { EMAIL_REGEX } from "../../constants/regex";

type Props = {
  id: string;
  supplierCompanyName: string;
};

const companyNameMapping = {
  clinic: "Clinic name",
  doctor: "Doctor's office name",
  publicService: "Department name",
  other: "Company name",
};

const ContactDetails: React.FC<Props> = ({ supplierCompanyName }) => {
  const { register, watch } = useFormContext();

  return (
    <Box>
      <Field name="firstName" label="First Name">
        <Input
          name="firstName"
          maxLength={254}
          ref={register({ required: true })}
        />
      </Field>

      <Field name="lastName" label="Last Name">
        <Input
          name="lastName"
          maxLength={254}
          ref={register({ required: true })}
        />
      </Field>

      <Field name="email" label="Email">
        <Input
          name="email"
          maxLength={254}
          type="email"
          ref={register({ required: true, pattern: EMAIL_REGEX })}
        />
      </Field>

      <Field name="phoneNumber" label="Phone Number">
        <Input
          maxLength={254}
          name="phoneNumber"
          ref={register({ required: true })}
          placeholder="+"
        />
      </Field>

      <Field name="companyType" label="Company Type">
        <Select
          name="companyType"
          ref={register({ required: true })}
          placeholder="Please select..."
        >
          <option value="clinic">Clinic</option>
          <option value="doctor">Doctor</option>
          <option value="publicService">Public service</option>
          <option value="other">Other</option>
        </Select>
      </Field>

      <Field
        name="companyName"
        label={companyNameMapping[watch("companyType")] || "Company name"}
      >
        <Input
          name="companyName"
          maxLength={254}
          ref={register({ required: true })}
        />
      </Field>
      <Field name="privacy" mt="8">
        <Checkbox name="privacy" ref={register({ required: true })}>
          <PrivacyCheckboxText />
        </Checkbox>
      </Field>
      <Field name="terms" mt="4">
        <Checkbox name="terms" ref={register({ required: true })}>
          <Text fontSize="sm" ml="2">
            I have understood that my contact details will be shared with the
            supplier "{supplierCompanyName}". Need-Mask.com is not liable for
            any usage of the shared data, any contracts closed between you and
            the supplier as well as any transactions. I also understood that all
            details such as availability, capacity, price range and lead time of
            the presented products are not binding and are up to further
            negotiation between me and the supplier.
          </Text>
        </Checkbox>
      </Field>
    </Box>
  );
};

export default ContactDetails;
