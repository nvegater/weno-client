import Head from "next/head";
import { createUrqlClient } from "../graphql/urqlProvider";
import { withUrqlClient } from "next-urql";
import useAuth from "../components/Authentication/useAuth";
import { WenoLayout } from "../components/GeneralLayout/WenoLayout";
import { Hero } from "../components/Hero/Hero";
import React, { useEffect, useState } from "react";
import {
  ExperiencesGridLayout,
  ExperiencesGridMode,
} from "../components/Experiences/ExperiencesGridLayout";
import {
  PaginatedExperience,
  useBookableExperiencesQuery,
} from "../graphql/generated/graphql";
import useFiltersPagination from "../components/utils/useFiltersPagination";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { ImFilter } from "react-icons/im";
import { LoadMoreButton } from "../components/Experiences/LoadMoreButton";

const Home = () => {
  const { authenticated, logout, login, tokenInfo } = useAuth();

  const [paginationConfig, experiencesFilters, handlePaginationRequest] =
    useFiltersPagination();

  const [experiences, setExperiences] = useState<PaginatedExperience[]>([]);

  const [{ data, fetching, error: networkError }] = useBookableExperiencesQuery(
    {
      variables: {
        paginatedExperiencesInputs: {
          paginationConfig: { ...paginationConfig },
          experiencesFilters: { ...experiencesFilters },
        },
      },
      requestPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (data?.bookableExperiences.experiences) {
      const newExps = data?.bookableExperiences?.experiences;
      const newTitles = newExps.map((exp) => exp.title);
      const oldTitles = experiences.map((exp) => exp.title);
      if (!newTitles.some((newTitle) => oldTitles.includes(newTitle))) {
        // update experiences if new request contains new titles
        setExperiences((e) => [...e, ...newExps]);
      }
    }
  }, [data, experiences]);

  const noMoreResults =
    data?.bookableExperiences?.paginationConfig?.beforeCursor === null &&
    data?.bookableExperiences?.paginationConfig?.afterCursor === null;

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
          <Hero />

          <Flex justifyContent="space-between" p={5}>
            <Heading as="h1" color="brand.200" fontWeight="700" size="2xl">
              Experiences
            </Heading>
            <Icon as={ImFilter} w={6} h={6} color="brand.300" mt={2} />
          </Flex>

          <ExperiencesGridLayout
            experiences={experiences}
            mode={ExperiencesGridMode.RESERVE}
            fetching={fetching}
            networkError={networkError}
          />

          <LoadMoreButton
            disableButton={noMoreResults}
            noOfExperiences={experiences.length}
            handlePaginationRequest={handlePaginationRequest}
            paginationConfig={paginationConfig}
            newPaginationConfig={data?.bookableExperiences?.paginationConfig}
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
