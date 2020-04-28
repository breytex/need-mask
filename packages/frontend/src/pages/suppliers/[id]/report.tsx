import * as React from "react";
import { NextPage, NextPageContext } from "next";
import { Supplier } from "../../../types/Supplier";
import { GET_SUPPLIER_HEADER } from "../../../graphql/queries/supplier";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Textarea,
  Text,
  Button,
  Box,
} from "@chakra-ui/core";
import Link from "next/link";
import { graphQuery } from "../../../graphql/graphQuery";
import PageHead from "../../../components/PageHead";
import Form from "../../../components/chakra/form/Form";
import { Field } from "../../../components/chakra/form/Field";
import { useFormContext } from "react-hook-form";
import SupplierHeader from "../../../components/supplier-detail-page/SupplierHeader";
import { useMutation } from "../../../hooks/useMutation";
import { Section } from "../../../components/chakra/form/Section";
import SuccessMessage from "../../../components/chakra/SuccessMessage";
import { ErrorMessage } from "../../../components/chakra/ErrorMessage";

type Props = {
  props: {
    id: string;
    supplier: Supplier;
  };
};

const ADD_SUPPLIER_REPORT = `
  mutation MyMutation($reason: String!, $supplierId: uuid!) {
    insert_reports(objects: {reason: $reason, supplierId: $supplierId}){affected_rows}
  }
`;

const ReportForm = () => {
  const { register } = useFormContext();

  return (
    <React.Fragment>
      <Field name="reason" label="Reason" hint="Max 1000 characters">
        <Textarea
          name="reason"
          maxLength={1000}
          ref={register({ required: true, maxLength: 1000 })}
          h="250px"
        />
      </Field>
    </React.Fragment>
  );
};

export const Report: NextPage<Props> = ({ props: { id, supplier } }) => {
  const { trigger, data, isLoading, errors } = useMutation<any>(
    ADD_SUPPLIER_REPORT
  );

  const onSubmit = (data) => {
    trigger({ supplierId: id, reason: data.reason });
  };

  if (data) {
    return (
      <SuccessMessage
        title="Thanks!"
        buttonTitle="Back to suppliers"
        onClickPath="/suppliers"
      >
        You have successfully submitted your report. Our moderators will now
        review the supplier.
      </SuccessMessage>
    );
  }

  return (
    <React.Fragment>
      <PageHead title="Report a Supplier" />
      <Breadcrumb fontSize="sm" mb="4">
        <BreadcrumbItem>
          <Link href="/suppliers">
            <BreadcrumbLink>Suppliers</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Link href={`/suppliers/${supplier.id}`}>
            <BreadcrumbLink href="#">{supplier.companyName}</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Report</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <SupplierHeader
        companyName={supplier.companyName}
        city={supplier.city}
        country={supplier.country}
        web={supplier.web}
      />

      <Section title="Report the Supplier" mb="8" maxW="600px" mt="10">
        <ErrorMessage show={errors.length > 0} title="An error happened" mb="5">
          {JSON.stringify(errors)}
        </ErrorMessage>
        <Text mb="6">
          The supplier does not appear to be a reliable business partner? The
          product details or certificats do not look legitimate? Send us your
          opinion.
        </Text>
        <Form onSubmit={onSubmit}>
          <ReportForm />
          <Button
            type="submit"
            isFullWidth
            variantColor="blue"
            size="lg"
            mt="6"
            isLoading={isLoading}
          >
            Submit your report
          </Button>
        </Form>
      </Section>
    </React.Fragment>
  );
};

Report.getInitialProps = async (context: NextPageContext) => {
  const { query } = context;
  const id = query.id as string;
  const { data } = await graphQuery(
    GET_SUPPLIER_HEADER,
    { id },
    { shouldCache: true }
  );

  return {
    props: {
      id,
      supplier: data.suppliers_by_pk,
    },
  };
};

export default Report;
