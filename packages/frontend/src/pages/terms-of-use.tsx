import * as React from "react";
import PageHead from "../components/PageHead";
import { Box, Text, Heading } from "@chakra-ui/core/dist";

type Props = {};

export const TermsOfUse: React.FC<Props> = () => {
  return (
    <>
      <PageHead title="Terms of Use" />
      <Box maxWidth="600px" mx="auto">
        <Heading as="h5" size="sm" my="2">
          Introduction
        </Heading>
        <Text mb="2">
          By using need-mask.com and its product database as well as its
          supplementary services, the user accepts the following Terms of Use,
          which govern the use of the website and its supplementary
          services. David Schmelzeisen is the publisher of the
          website www.need-mask.com°and all other related NeedMask language
          versions and their supplementary services. need-mask.com offers
          services for online listings and access to several online databases
          with information on products, services, companies and other business
          data for commercial use only. need-mask.com has no own commercial
          interests. Need-mask.com is not a vendor of any goods or services.
          Need-mask.com does not take any provisions of listed companies.
        </Text>

        <Heading as="h5" size="sm" my="2">
          Scope of Use
        </Heading>
        <Text mb="2">
          §1 The user can create a listing via form submission in order to enter
          information about his company in the product database.
        </Text>

        <Text mb="2">
          §2 The user agrees to use the product search and its supplementary
          services exclusively in the context of his commercial and independent
          professional activities.
        </Text>

        <Text mb="2">
          §3 The user undertakes not to send any pornographic or politically
          extremist content.
        </Text>

        <Text mb="2">
          §4 Any use for communication not covered by the definitions in § 2 is
          deemed to be unsolicited communication (spam) and is prohibited. The
          user notes that the recipient of spam may be entitled to injunctive
          relief under competition law and/or to a claim for damages against the
          user irrespective of the selected technical form of communication
          (e-mail, phone or SMS).
        </Text>

        <Heading as="h5" size="sm" my="2">
          Liability and Copyright
        </Heading>
        <Text mb="2">
          need-mask.com assumes no guarantee, responsibility, assurances or
          liability for the topicality, completeness and correctness of all
          services and information provided, or for an uninterrupted and
          error-free Internet connection without malfunctions.
        </Text>

        <Text mb="2">
          The user is aware that he/she uses need-mask.com services and
          information at his/her own risk. The user can contact all companies
          listed on need-mask.com. need-mask.com accepts no responsibility or
          liability for damage caused by the use of the services, databases and
          their contents as well as the use of external links to other websites,
          for whatever reason. All need-mask.com databases, including their
          contents, are subject to unlimited copyright, both individually and as
          a whole. The user undertakes not to market, forward to third parties,
          copy, automatically or individually download, duplicate, reproduce,
          publish, or commercially use or exploit any data, logos, graphics,
          texts, services, etc. published or made available by need-mask.com for
          its own business purposes. The user is aware that the use of
          need-mask.com data and services for spamming is expressly prohibited.
        </Text>

        <Heading as="h5" size="sm" my="2">
          Privacy
        </Heading>
        <Text mb="2">The user has taken note of the Privacy Policy.</Text>
      </Box>
    </>
  );
};

export default TermsOfUse;
