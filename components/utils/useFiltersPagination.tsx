import { Dispatch, SetStateAction, useState } from "react";
import {
  CursorPaginationInput,
  ExperiencesFilters,
} from "../../graphql/generated/graphql";

const DEFAULT_PAGINATION_CONFIG = {
  beforeCursor: null,
  afterCursor: null,
  limit: 10,
};

const DEFAULT_FILTERS_CONFIG: ExperiencesFilters = {
  valley: null,
  experienceType: null,
  experienceName: null,
  fromDateTime: null,
  untilDateTime: null,
  hasSlotsInFuture: null,
  wineryIds: null,
};

function isNewCursorConfig(
  newBeforeCursor: string | null,
  newAfterCursor: string | null,
  oldBeforeCursor: string | null,
  oldAfterCursor: string | null
) {
  const isNewBeforeCursor = oldBeforeCursor !== newBeforeCursor;
  const isNewAfterCursor = oldAfterCursor !== newAfterCursor;
  return isNewAfterCursor || isNewBeforeCursor;
}

interface PaginationRequestProps {
  oldPaginationConfig: CursorPaginationInput;
  newPaginationConfig: CursorPaginationInput;
}

export type HandlePaginationRequestFn = (props: PaginationRequestProps) => void;

type FiltersPaginationHookResult = [
  paginationConfig: CursorPaginationInput,
  experiencesFilters: ExperiencesFilters,
  setExperiencesFilters: Dispatch<SetStateAction<ExperiencesFilters>>,
  handlePaginationRequest: HandlePaginationRequestFn
];

interface FiltersPaginationProps {
  initialFilters?: ExperiencesFilters;
}

type FiltersPaginationHook = (
  props: FiltersPaginationProps
) => FiltersPaginationHookResult;

const useFiltersPagination: FiltersPaginationHook = ({ initialFilters }) => {
  const [experiencesFilters, setExperiencesFilters] =
    useState<ExperiencesFilters>(initialFilters ?? DEFAULT_FILTERS_CONFIG);
  const [paginationConfig, setPaginationConfig] =
    useState<CursorPaginationInput>(DEFAULT_PAGINATION_CONFIG);

  const handlePaginationRequest: HandlePaginationRequestFn = ({
    oldPaginationConfig,
    newPaginationConfig,
  }) => {
    if (
      isNewCursorConfig(
        newPaginationConfig.beforeCursor,
        newPaginationConfig.afterCursor,
        oldPaginationConfig.beforeCursor,
        oldPaginationConfig.afterCursor
      )
    ) {
      setPaginationConfig((oldConfig) => ({
        limit: oldConfig.limit,
        beforeCursor: newPaginationConfig.beforeCursor,
        afterCursor: newPaginationConfig.afterCursor,
      }));
    }
  };

  return [
    paginationConfig,
    experiencesFilters,
    setExperiencesFilters,
    handlePaginationRequest,
  ];
};

export default useFiltersPagination;
