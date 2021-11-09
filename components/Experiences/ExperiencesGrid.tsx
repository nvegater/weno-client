import React, { FC, useMemo, useState } from "react";
import { useExperiencesQuery } from "../../graphql/generated/graphql";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";

interface ExperiencesGridProps {}

export const ExperiencesGrid: FC<ExperiencesGridProps> = ({}) => {
  // TODO for now only show experiences when user is logged in.
  const { keycloak } = useKeycloak<KeycloakInstance>();

  const contextHeader = useMemo(
    () => ({
      fetchOptions: {
        headers: {
          Authorization: "Bearer " + keycloak.token,
        },
      },
    }),
    [keycloak.token]
  );
  const [{ data, error, fetching }] = useExperiencesQuery({
    variables: {
      limit: 9,
      cursor: null as string | null,
    },
    context: contextHeader,
  });
  return (
    <div>
      {data && <div>{JSON.stringify(data)}</div>}
      {error && <div>{JSON.stringify(error)}</div>}
      {fetching && <div>Loading....</div>}
    </div>
  );
};
