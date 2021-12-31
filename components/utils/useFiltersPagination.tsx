import { useState } from "react";
import {
  CursorPaginationInput,
  ExperiencesFilters,
} from "../../graphql/generated/graphql";

const DEFAULT_PAGINATION_CONFIG = {
  beforeCursor: null,
  afterCursor: null,
  limit: 4,
};

const DEFAULT_FILTERS_CONFIG = {
  valley: null,
  experienceType: null,
  experienceName: null,
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

type HandlePaginationRequestFn = (
  oldPaginationConfig: CursorPaginationInput,
  newPaginationConfig: CursorPaginationInput
) => boolean;

type FiltersPaginationHookResult = [
  paginationConfig: CursorPaginationInput,
  experiencesFilters: ExperiencesFilters,
  handlePaginationRequest: HandlePaginationRequestFn
];

type FiltersPaginationHook = () => FiltersPaginationHookResult;

const useFiltersPagination: FiltersPaginationHook = () => {
  const [experiencesFilters] = useState<ExperiencesFilters>(
    DEFAULT_FILTERS_CONFIG
  );
  const [paginationConfig, setPaginationConfig] =
    useState<CursorPaginationInput>(DEFAULT_PAGINATION_CONFIG);

  const handlePaginationRequest = (
    oldPaginationConfig: CursorPaginationInput,
    newPaginationConfig: CursorPaginationInput
  ) => {
    let updateScheduled: boolean = false;
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
      updateScheduled = true;
    }
    return updateScheduled;
  };

  return [paginationConfig, experiencesFilters, handlePaginationRequest];
};

export default useFiltersPagination;
