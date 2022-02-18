import {
  HStack,
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Switch,
  Text,
  Stack,
  StackDivider,
  StackProps,
} from "@chakra-ui/react";
import * as React from "react";
import { Card } from "./Card";
import { FieldGroup } from "./FieldGroup";
import { HeadingGroup } from "./HeadingGroup";
import { useTranslation } from "react-i18next";

export const AccountSettings = (props: StackProps) => {
  const [t] = useTranslation("global");

  return (
    <Stack as="section" spacing="6" {...props}>
      <HeadingGroup
        title={t("accountSettings")}
        description={t("changeProfile")}
      />
      <Card>
        <Stack divider={<StackDivider />} spacing="6">
          <FieldGroup
            title={t("nameAndAvatar")}
            description={t("changeNameDescription")}
          >
            <HStack spacing="4">
              <Avatar
                src="https://images.unsplash.com/photo-1470506028280-a011fb34b6f7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80"
                name="Lisa Turner"
              />
              <Box>
                <Text>Lisa Turner</Text>
                <Text color="gray.500" fontSize="sm">
                  Joined March, 2010
                </Text>
              </Box>
            </HStack>
            <HStack mt="5">
              <Button size="sm" fontWeight="normal">
                {t("changeName")}
              </Button>
              <Button size="sm" fontWeight="normal">
                {t("changeAvatar")}
              </Button>
            </HStack>
          </FieldGroup>

          <FieldGroup
            title={t("loginDetails")}
            description={t("changeEmailAndPassword")}
          >
            <Text fontSize="sm">lisat09@example.com</Text>
            <HStack mt="5">
              <Button size="sm" fontWeight="normal">
                {t("changeEmail")}
              </Button>
              <Button size="sm" fontWeight="normal">
                {t("changePassword")}
              </Button>
            </HStack>
          </FieldGroup>

          <FieldGroup title={t("language")} description={t("changeLanguage")}>
            <Stack
              direction={{ base: "column", md: "row" }}
              width="full"
              spacing="4"
            >
              <FormControl id="language">
                <FormLabel fontSize="sm">{t("language")}</FormLabel>
                <Select size="sm" maxW="2xs">
                  <option>{t("english")}</option>
                  <option>{t("hebrew")}</option>
                  <option>{t("arabic")}</option>
                </Select>
              </FormControl>

              <FormControl id="currency">
                <FormLabel fontSize="sm">{t("currency")}</FormLabel>
                <Select size="sm" maxW="2xs">
                  <option>USD ($)</option>
                  <option>AED (dh)</option>
                  <option>EUR (€)</option>
                </Select>
              </FormControl>
            </Stack>
            <Button mt="5" size="sm" fontWeight="normal">
              {t("saveChanges")}
            </Button>
          </FieldGroup>

          <FieldGroup
            title={t("communications")}
            description={t("manageEmail")}
          >
            <Stack spacing="3">
              <FormControl display="flex" alignItems="center">
                <FormLabel
                  htmlFor="email-marketing"
                  flex="1"
                  fontSize="sm"
                  mb="0"
                >
                  {t("productIntro")}
                </FormLabel>
                <Switch id="email-marketing" />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-news" flex="1" fontSize="sm" mb="0">
                  {t("updatesAndNews")}
                </FormLabel>
                <Switch id="email-news" />
              </FormControl>
            </Stack>
            <Button mt="5" size="sm" fontWeight="normal">
              {t("saveChanges")}
            </Button>
          </FieldGroup>
        </Stack>
      </Card>
    </Stack>
  );
};
