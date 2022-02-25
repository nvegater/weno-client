import * as React from "react";
import {
  Box,
  BoxProps,
  Button,
  Flex,
  FlexProps,
  LightMode,
  List,
  ListIcon,
  ListItem,
  ListItemProps,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { HiArrowNarrowRight, HiCheckCircle } from "react-icons/hi";
import { useTranslation } from "react-i18next";

interface PriceDisplayProps extends FlexProps {
  currency: string;
  price: number;
  duration: string;
}

const PriceDisplay = (props: PriceDisplayProps) => {
  const { currency, price, duration, ...rest } = props;
  return (
    <Flex w="100%" align="center" {...rest}>
      <Text fontSize="2xl" lineHeight="1" marginEnd="2">
        ${price}
      </Text>
      <Text fontSize="2xl" lineHeight="1" letterSpacing="tight">
        {currency}
      </Text>
      <Text fontSize="2xl" marginStart="1" alignSelf="flex-end">
        {duration}
      </Text>
    </Flex>
  );
};

const PricingDetail = (props: ListItemProps) => {
  const { children, ...rest } = props;
  return (
    <ListItem display="flex" alignItems="center" fontWeight="medium" {...rest}>
      <ListIcon
        fontSize="2xl"
        as={HiCheckCircle}
        color="brand.500"
        marginEnd="4"
        mt="1"
      />
      <Text as="span" display="inline-block">
        {children}
      </Text>
    </ListItem>
  );
};

interface PricingCardProps extends BoxProps {
  features: string[];
  name: string;
  description: string;
  duration: string;
  price: number;
  colorScheme: string;
  onClick?: () => void;
}

export const PricingCard = (props: PricingCardProps) => {
  const {
    features,
    name,
    description,
    onClick,
    price,
    duration,
    colorScheme: c,
    color,
    bg,
    ...rest
  } = props;
  const [t] = useTranslation("global");
  return (
    <Box
      shadow="md"
      w="full"
      maxW="lg"
      mx="auto"
      rounded="lg"
      overflow="hidden"
      borderColor={color}
      borderWidth="thin"
      color="brand.200"
      {...rest}
    >
      <Box alignItems="center" px="3" py="8">
        <Text fontWeight="extrabold" fontSize="3xl">
          {name}
        </Text>
        <PriceDisplay my="2" currency="mxn" price={price} duration={duration} />
      </Box>
      <Box px="5" py="5">
        <List stylePosition="outside" spacing="4">
          {features.map((feature, index) => (
            <PricingDetail key={index}>{feature}</PricingDetail>
          ))}
        </List>
      </Box>
      <Box px="8" py="6" borderBottomWidth="1px">
        <LightMode>
          <Button
            onClick={onClick}
            size="md"
            w="full"
            bg={color}
            color="white"
            rightIcon={<HiArrowNarrowRight />}
          >
            {t("subscribe")}
          </Button>
        </LightMode>
      </Box>
    </Box>
  );
};
