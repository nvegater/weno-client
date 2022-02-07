import React, { FC } from "react";
import { ExperiencesGridLayout } from "./ExperiencesGridLayout";
import useExperiences from "./useExperiences";
import { Filters } from "../Filters/Filters";
import {
  ExperiencesFilters,
  PaginatedExperienceFragment,
} from "../../graphql/generated/graphql";
import { Box, Button, Flex, Heading, Skeleton } from "@chakra-ui/react";

interface ExperiencesProps {
  hasFilters: boolean;
  initialFilters?: ExperiencesFilters;
  openExperienceModal: (experience: PaginatedExperienceFragment) => void;
}

export const Experiences: FC<ExperiencesProps> = ({
  hasFilters,
  initialFilters,
  openExperienceModal,
}) => {
  const {
    filters,
    setFilters,
    loadMore,
    resetExperiences,
    networkError,
    businessError,
    experiences,
    isFetching,
    disableButton,
  } = useExperiences({ filters: initialFilters });

  return (
    <>
      {experiences.length === 0 && !isFetching && (
        <Heading as="h2" size="sm" color="brand.200" textAlign="center">
          No results found
        </Heading>
      )}
      {networkError && !isFetching && experiences.length === 0 && (
        <Heading as="h2" size="sm" color="brand.200" textAlign="center">
          An error has ocurred
        </Heading>
      )}
      {businessError && !isFetching && experiences.length === 0 && (
        <Heading as="h2" size="sm" color="brand.200" textAlign="center">
          An error in our servers has ocurred
        </Heading>
      )}

      {hasFilters && (
        <Filters
          setExperiencesFilters={setFilters}
          initialFilters={filters}
          resetExperiencesOnNewSearch={resetExperiences}
        />
      )}
      {isFetching &&
        [1, 2, 3, 4, 5].map((no) => (
          <Box key={no} p={5} borderRadius="12px">
            <Skeleton
              startColor="brand.400"
              endColor="#D23F80"
              height="200px"
              borderRadius="12px"
            />
          </Box>
        ))}
      <ExperiencesGridLayout
        experiences={experiences}
        openExperienceModal={openExperienceModal}
      />
      <Flex justifyContent="center" mt={5}>
        <Button
          size="navBarCTA"
          variant="cta"
          width="300px"
          isDisabled={disableButton}
          onClick={() => {
            loadMore();
          }}
        >
          {disableButton ? "No more results" : "Load more"}
        </Button>
      </Flex>
    </>
  );
};
