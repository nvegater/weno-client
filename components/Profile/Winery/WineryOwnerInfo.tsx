import React, { FC } from "react";
import { Heading, Flex, Button, Text, Link } from "@chakra-ui/react";
import {
  CardProperty,
  CardWithUserDetails,
} from "../../Cards/CardWithUserDetails/CardWithUserDetails";
import {
  useGetSubscriptionStatusQuery,
  useWineryOnboardingMutation,
  WineryFragmentFragment,
} from "../../../graphql/generated/graphql";
import { ContextHeader } from "../../Authentication/useAuth";
import { useTranslation } from "react-i18next";

interface WineryOwnerInfoProps {
  winery: WineryFragmentFragment;
  contextHeader: ContextHeader;
}

// https://nodejs.org/docs/latest-v12.x/api/intl.html
const timeFormatter = Intl.DateTimeFormat("en", {
  minute: "2-digit",
  hour: "2-digit",
});
const dateFormatter = Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});
export const WineryOwnerInfo: FC<WineryOwnerInfoProps> = ({
  winery,
  contextHeader,
}) => {
  // TODO modify this query to get an object with all the subscription related information: Subscription, connected account, payment status, count of reservations etc..
  const [
    {
      data: subscriptionStatus,
      error: errorSubscriptionStatus,
      fetching: fetchingSubsStatus,
    },
  ] = useGetSubscriptionStatusQuery({
    variables: { customerId: winery.stripe_customerId },
    context: contextHeader,
  });
  const [t] = useTranslation("global");
  const [, onboardWinery] = useWineryOnboardingMutation();

  const handleOnboarding = async () => {
    const { error, data } = await onboardWinery({
      wineryAlias: winery.urlAlias,
    });
    if (error) {
      console.log(error);
    } else {
      window.location.href = data.wineryOnboarding?.accountLinkUrl;
    }
  };

  const newDate = new Date(winery.createdAt);
  const createdAt = `${timeFormatter.format(newDate)} - ${dateFormatter.format(
    newDate
  )}`;
  const accountProps: CardProperty[] = [
    { name: t("username"), value: winery.creatorUsername },
    { name: t("email"), value: winery.creatorEmail },
    { name: t("memberSince"), value: createdAt },
  ];
  const subscriptionProps: CardProperty[] = [
    { name: t("tier"), value: winery.subscription },
    { name: t("customerId"), value: winery.stripe_customerId },
    {
      name: t("status"),
      value: subscriptionStatus
        ? subscriptionStatus.getSubscriptionStatus
        : errorSubscriptionStatus
        ? t("error")
        : fetchingSubsStatus
        ? t("loading")
        : "",
    },
  ];
  return (
    <section>
      <Flex justifyContent={[null, null, null, "center"]}>
        <Heading as="h1" size="xl">
          {t("wineryInformation")}
        </Heading>
      </Flex>

      <CardWithUserDetails properties={accountProps} title="Account" />
      <CardWithUserDetails
        properties={subscriptionProps}
        title={t("subscription")}
      />

      <Flex justifyContent={[null, null, null, "center"]}>
        <Heading as="h4" size="md">
          {t("oneMoreStep")}
        </Heading>
      </Flex>

      <Text
        my={4}
        mx={[0, 0, 0, "5em"]}
        textAlign={[null, null, null, "center"]}
      >
        {t("securityAd")} <br /> {t("partneredWith")}{" "}
        <Link
          fontWeight="bold"
          href="https://stripe.com/blog/stripe-launches-in-mexico"
        >
          Stripe
        </Link>
        {t("readMore")}{" "}
        <Link href="https://stripe.com/en-mx/privacy">
          {t("privacyPolicy")}
        </Link>
        .
      </Text>

      <Flex justifyContent={[null, null, null, "center"]}>
        <Button
          variant="secondaryWeno"
          size="heroWeno"
          onClick={handleOnboarding}
        >
          {t("enableStripe")}
        </Button>
      </Flex>
    </section>
  );
};
