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
  PaginatedExperienceLightFragment,
  useBookableExperiencesQuery,
} from "../graphql/generated/graphql";
import useFiltersPagination from "../components/utils/useFiltersPagination";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { ImFilter } from "react-icons/im";
import { LoadMoreButton } from "../components/Experiences/LoadMoreButton";
import { Filters } from "../components/Filters/Filters";
import { getUniqueListTyped } from "../components/utils/react-utils";

const Home = () => {
  const { authenticated, logout, login, register, tokenInfo } = useAuth();

  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const [
    paginationConfig,
    experiencesFilters,
    setFilters,
    handlePaginationRequest,
  ] = useFiltersPagination();

  const [experiences, setExperiences] = useState<
    PaginatedExperienceLightFragment[]
  >([]);

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
    if (data) {
      if (data.bookableExperiences.errors) {
        setExperiences([]);
      } else {
        const newExps = data?.bookableExperiences?.experiences;
        setExperiences((e) => {
          const accumulated = [...e, ...newExps];
          const unique = getUniqueListTyped(accumulated, "id");
          return [...unique];
        });
      }
    }
  }, [data]);

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

          {openFilters && (
            <Filters
              setExperiencesFilters={setFilters}
              initialFilters={experiencesFilters}
              resetExperiencesOnNewSearch={() => setExperiences([])}
            />
          )}

          <ExperiencesGridLayout
            experiences={experiences}
            mode={ExperiencesGridMode.RESERVE}
            fetching={fetching}
            networkError={networkError}
            fromDateTime={experiencesFilters.fromDateTime}
            untilDateTime={experiencesFilters.untilDateTime}
          />

          <LoadMoreButton
            disableButton={
              !Boolean(data?.bookableExperiences?.paginationConfig?.moreResults)
            }
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
