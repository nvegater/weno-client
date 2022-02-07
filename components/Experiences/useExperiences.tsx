import useFiltersPagination from "../utils/useFiltersPagination";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ErrorFragmentFragment,
  ExperiencesFilters,
  PaginatedExperienceFragment,
  useExperiencesQuery,
} from "../../graphql/generated/graphql";
import { CombinedError } from "urql";
import { getUniqueListTyped } from "../utils/react-utils";

interface UseExperiencesProps {
  filters: ExperiencesFilters;
}

interface UseExperiencesResult {
  filters: ExperiencesFilters;
  setFilters: Dispatch<SetStateAction<ExperiencesFilters>>;
  loadMore: () => void;
  experiences: PaginatedExperienceFragment[];
  resetExperiences: () => void;
  networkError: CombinedError;
  businessError: ErrorFragmentFragment;
  isFetching: boolean;
  disableButton: boolean;
}

const useExperiences = ({ filters }: UseExperiencesProps) => {
  const [pagination, newFilters, setFilters, handlePaginationRequest] =
    useFiltersPagination({ initialFilters: filters });

  const [experiences, setExperiences] = useState<PaginatedExperienceFragment[]>(
    []
  );

  const [businessError, setBusinessError] = useState<any>();

  const [{ data, fetching, error: networkError }] = useExperiencesQuery({
    variables: {
      paginatedExperiencesInputs: {
        pagination,
        filters: { ...newFilters },
      },
    },
    requestPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      if (data.experiences.errors) {
        setExperiences([]);
        setBusinessError(data.experiences.errors[0]);
      } else {
        const newExps = data?.experiences?.experiences;
        setExperiences((e) => {
          const accumulated = [...e, ...newExps];
          const unique = getUniqueListTyped(accumulated, "id");
          return [...unique];
        });
      }
    }
  }, [data]);

  const resetExperiences = () => setExperiences([]);

  const disableLoadMoreButton = !Boolean(
    data?.experiences?.paginationConfig?.moreResults
  );

  const loadMoreExperiences = () => {
    if (experiences.length > 0) {
      handlePaginationRequest({
        oldPaginationConfig: pagination,
        newPaginationConfig: data?.experiences?.paginationConfig,
      });
    }
  };

  const returnThis: UseExperiencesResult = {
    filters: newFilters,
    setFilters,
    experiences,
    resetExperiences,
    networkError,
    businessError,
    isFetching: fetching,
    disableButton: disableLoadMoreButton,
    loadMore: loadMoreExperiences,
  };
  return returnThis;
};

export default useExperiences;
