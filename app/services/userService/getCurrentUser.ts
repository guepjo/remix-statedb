import { LDAPUser } from "~/types/data/user";
import { request } from "~/utils";

export const getCurrentUser = async () => {
  const response = await request<LDAPUser>("/handler/my-user");

  return response;
};
