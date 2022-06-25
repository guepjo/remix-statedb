/**
 * @description
 * Query Key names used across the app.
 * @example
 * ```ts
 * const response = useQuery({
 *  queryKey: [RQ_QUERY_KEY.key_name_here],
 *  ...
 * });
 * ```
 *
 * @docs
 * https://react-query.tanstack.com/guides/query-keys#_top
 * https://tkdodo.eu/blog/effective-react-query-keys
 */
export const RQ_QUERY_KEY = {
  useExportFaultsPageTableData: 'useExportFaultsPageTableData',
  useGetCurrentUser: 'useGetCurrentUser',
  useGetFaults: 'useGetFaults',
  useGetFaultsMetaData: 'useGetFaultsMetaData',
} as const;

/*
To clear all react-query keys, run the following method `queryCache.clear()`
https://react-query.tanstack.com/reference/QueryCache#querycacheclear

To manually clear individual queries & refetch fresh data,
use `invalidateQueries`
- https://react-query.tanstack.com/guides/query-invalidation#query-matching-with-invalidatequeries
*/
