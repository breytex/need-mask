import * as React from "react";
import { Heading, Text } from "@chakra-ui/core";
import SiteHero from "../components/SiteHero";
import PageHead from "../components/PageHead";

const Imprint = () => {
  return (
    <div>
      <PageHead title="Imprint" />
      <SiteHero title="Imprint" />

      <Heading as="h4" size="sm">
        Legal Disclosure
      </Heading>
      <Text mb={4}>
        Information in accordance with Section 5 TMG David Schmelzeisen
        Kuckhoffstr. 31 52064 Aachen Contact Information E-Mail:
        david.schmelzeisen@ita.rwth-aachen.de Internet address:
        www.need-mask.com Graphics and Image Sources
        https://unsplash.com/license
      </Text>
      <Heading as="h4" size="sm">
        Disclaimer
      </Heading>
      <Text mb={4}>
        Accountability for content The contents of our pages have been created
        with the utmost care. However, we cannot guarantee the contents'
        accuracy, completeness or topicality. According to statutory provisions,
        we are furthermore responsible for our own content on these web pages.
        In this matter, please note that we are not obliged to monitor the
        transmitted or saved information of third parties, or investigate
        circumstances pointing to illegal activity. Our obligations to remove or
        block the use of information under generally applicable laws remain
        unaffected by this as per §§ 8 to 10 of the Telemedia Act (TMG).
      </Text>
      <Heading as="h4" size="sm">
        Accountability
      </Heading>
      <Text mb={4}>
        Accountability for links Responsibility for the content of external
        links (to web pages of third parties) lies solely with the operators of
        the linked pages. No violations were evident to us at the time of
        linking. Should any legal infringement become known to us, we will
        remove the respective link immediately.
      </Text>
      <Heading as="h4" size="sm">
        Copyright
      </Heading>
      <Text>
        Our web pages and their contents are subject to German copyright law.
        Unless expressly permitted by law, every form of utilizing, reproducing
        or processing works subject to copyright protection on our web pages
        requires the prior consent of the respective owner of the rights.
        Individual reproductions of a work are only allowed for private use. The
        materials from these pages are copyrighted and any unauthorized use may
        violate copyright laws.
      </Text>
    </div>
  );
};

export default Imprint;
