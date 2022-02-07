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

const Home = () => {
  const { authenticated, logout, login, register, tokenInfo } = useAuth();

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
        <meta name="description" content="Weno" />
      </Head>
      <main>
        <WenoLayout
          loginFn={login}
          logoutFn={logout}
          authenticated={authenticated}
          tokenInfo={tokenInfo}
        >
          <Hero authenticated={authenticated} register={register} />

          <Flex
            justifyContent={["space-between", null, null, "space-around"]}
            py={5}
            mx={[10, 10, 10, 20]}
          >
            <Heading as="h1" color="brand.200" fontWeight="700" size="2xl">
              Experiences
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
  ssr: true,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Home);
