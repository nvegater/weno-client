import React, { FC, useMemo } from "react";
//import { useExperiencesQuery } from "../../graphql/generated/graphql";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { useWineryQuery } from "../../graphql/generated/graphql";

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
  const [{ data, error, fetching }] = useWineryQuery({
    variables: {
      getWineryInputs: {},
    },
    context: contextHeader,
    pause: true,
  });
  return (
    <div>
      {data && <div>{JSON.stringify(data)}</div>}
      {error && <div>{JSON.stringify(error)}</div>}
      {fetching && <div>Loading....</div>}
    </div>
  );
};
