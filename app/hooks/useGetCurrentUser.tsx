import React from "react";
import { notification } from "antd";
import { APIErrorMessage } from "~/components/APIErrorMessage";
import { useQuery, UseQueryOptions } from "react-query";
import { UserService } from "~/services";
import { LDAPUser } from "~/types/data/user";
import { LS_KEY, RQ_QUERY_KEY } from "~/utils";

const PLACEHOLDER_USER: LDAPUser = {
  city: "",
  cn: "",
  country: "",
  department: "",
  departmentNumber: "",
  dn: "",
  email: "",
  employeeId: "",
  employeeType: "",
  firstname: "",
  fullname: "",
  lastname: "",
  mailNickname: "",
  mobileNumber: "",
  office: "",
  postalCode: "",
  sAMAccountName: "",
  startDate: "",
  state: "",
  streetAddress: "",
  title: "",
  urn: "",
  userPrincipalName: "",
  username: "",
  _direct_reports: [],
  _manager: [],
};

/**
 * @description
 * Fetches the currently logged in user using the web app (which is you).
 * The user is the LDAP user data.
 */
export const useGetCurrentUser = (rqConfig: UseQueryOptions<LDAPUser>) => {
  return useQuery({
    queryKey: [RQ_QUERY_KEY.useGetCurrentUser],
    queryFn: () => UserService.getCurrentUser(),
    onSuccess: (user) => {
      window.localStorage.setItem(LS_KEY.APP__AUTH_STATE, JSON.stringify(user));
    },
    placeholderData: PLACEHOLDER_USER,
    onError: (error) => {
      console.error(`[${RQ_QUERY_KEY.useGetCurrentUser}]: `, error);

      notification.error({
        key: `${RQ_QUERY_KEY.useGetCurrentUser}-error`,
        message: "Error Getting Currently Logged In User",
        description: <APIErrorMessage />,
      });
    },
    staleTime: 0,
    cacheTime: 0,
    ...rqConfig,
  });
};
