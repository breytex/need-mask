import React, { useState } from "react";
import { NextPage, NextPageContext } from "next";
import { Supplier } from "../../types/Supplier";
import { GET_SUPPLIER_HEADER } from "../../graphql/queries/supplier";
import { Textarea, Text, Button, Heading } from "@chakra-ui/core";
import PageHead from "../../components/PageHead";
import Form from "../../components/chakra/form/Form";
import { Field } from "../../components/chakra/form/Field";
import { useFormContext } from "react-hook-form";
import SupplierHeader from "../../components/supplier-detail-page/SupplierHeader";
import { Section } from "../../components/chakra/form/Section";
import SuccessMessage from "../../components/chakra/SuccessMessage";
import { rootGraphQuery } from "../api/utils/rootGraphQuery";
import { useRouter } from "next/router";
import queryString from "query-string";

type Props = {
  id: string;
  supplier: Supplier;
};

const ReportForm = () => {
  const { register } = useFormContext();

  return (
    <React.Fragment>
      <Field name="feedback" label="Feedback" hint="Max 1000 characters">
        <Textarea
          name="feedback"
          maxLength={1000}
          ref={register({ required: true, maxLength: 1000 })}
          h="250px"
        />
      </Field>
    </React.Fragment>
  );
};

export const Report: NextPage<Props> = ({ id, supplier }) => {
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    const queryParams = queryString.stringify({
      hash: router.query.hash,
      supplierId: id,
      status: "feedback",
      msg: data.feedback,
    });

    await fetch(
      `https://need-mask.com/api/review/publish-supplier?${queryParams}`
    );

    setSuccess(true);
  };

  if (success) {
    return (
      <SuccessMessage title="Thanks!">
        The supplier received your feedback via email. You can close this window
        now.
      </SuccessMessage>
    );
  }

  return (
    <React.Fragment>
      <PageHead title="Send Supplier Feedback" />
      <Heading>ADMIN MODE</Heading>
      <SupplierHeader
        companyName={supplier.companyName}
        city={supplier.city}
        country={supplier.country}
        web={supplier.web}
      />

      <Section title="Send supplier feedback" mb="8" maxW="600px" mt="10">
        <Text mb="6">
          Enter a reason why you don't want to publish this supplier. The
          supplier will be informed via email and can then rework the
          application.
        </Text>
        <Form onSubmit={onSubmit}>
          <ReportForm />
          <Button
            type="submit"
            isFullWidth
            variantColor="blue"
            size="lg"
            mt="6"
          >
            Submit your feedback
          </Button>
        </Form>
      </Section>
    </React.Fragment>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const id = query.supplierId as string;

  const { data } = await rootGraphQuery(GET_SUPPLIER_HEADER, { id });

  return {
    props: {
      id,
      supplier: data.suppliers_by_pk,
    },
  };
};

export default Report;
