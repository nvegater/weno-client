import {
  Cache,
  CacheExchangeOpts,
  QueryInput,
} from "@urql/exchange-graphcache";

export function typedResolver<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  update: (result: Result, query: Query) => Query
) {
  return cache.updateQuery(
    queryInput,
    (data) => update(result, data as any) as any
  );
}

const cacheUpdates: CacheExchangeOpts = {};

export default cacheUpdates;
