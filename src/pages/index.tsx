import Head from "next/head";
import { createUrqlClient } from "../graphql/urqlProvider";
import { withUrqlClient } from "next-urql";
import useAuth from "../components/Authentication/useAuth";
import { WenoLayout } from "../components/GeneralLayout/WenoLayout";
import { Hero } from "../components/Hero/Hero";
import React, { useState } from "react";
import { Flex, Heading, Icon, useDisclosure } from "@chakra-ui/react";
import { ImFilter } from "react-icons/im";
import { Experiences } from "../components/Experiences/Experiences";
import { PaginatedExperienceFragment } from "../graphql/generated/graphql";
import {
  ExperienceDrawer,
  ExperiencesGridMode,
} from "../components/Experiences/ExperienceDrawer";
import { useTranslation } from "react-i18next";

const Home = () => {
  const {
    authenticated,
    logout,
    login,
    register,
    email,
    isVisitor,
    isOwner,
    preferred_username,
  } = useAuth();

  const [t] = useTranslation("global");

  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const [experience, setExperience] = useState<PaginatedExperienceFragment>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const openExperienceModal = (experience: PaginatedExperienceFragment) => {
    onOpen();
    setExperience(experience);
  };
  return (
    <div>
      <Head>
        <title>Weno</title>
        <meta
          name="description"
          content="Book events related to the wine industry in Ensenada"
        />
        <link rel="icon" href="/public/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/public/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/public/favicon-16x16.png"
        />
        <link rel="manifest" href="/public/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/public/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#c35a5a" />
      </Head>
      <main>
        <WenoLayout
          loginFn={login}
          logoutFn={logout}
          authenticated={authenticated}
          email={email}
          isOwner={isOwner}
          isVisitor={isVisitor}
          preferred_username={preferred_username}
        >
          <Hero authenticated={authenticated} register={register} />

          <Flex
            justifyContent={["space-between", null, null, "space-around"]}
            py={5}
            mx={[10, 10, 10, 20]}
          >
            <Heading as="h1" color="brand.200" fontWeight="700" size="2xl">
              {t("experiences")}
            </Heading>
            <Icon
              as={ImFilter}
              w={6}
              h={6}
              color="brand.300"
              mt={2}
              onClick={() => {
                setOpenFilters(!openFilters);
              }}
            />
          </Flex>

          <ExperienceDrawer
            mode={ExperiencesGridMode.RESERVE}
            isOpen={isOpen}
            onClose={onClose}
            experience={experience}
            winery={null}
          />

          <Experiences
            hasFilters={openFilters}
            openExperienceModal={openExperienceModal}
            initialFilters={{
              hasSlotsInFuture: true,
            }}
          />
        </WenoLayout>
      </main>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: false,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Home);
