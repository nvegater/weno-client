import React, { FC } from "react";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { WenoLayout } from "../components/GeneralLayout/WenoLayout";
import { Flex, Heading } from "@chakra-ui/react";

interface RegisterProps {}

const Register: FC<RegisterProps> = ({}) => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();

  return (
    <WenoLayout>
      {!initialized && !keycloak.authenticated && <div>Loading...</div>}
      {initialized && !keycloak.authenticated && (
        <div>Youre not authenticated</div>
      )}
      {keycloak.authenticated && (
        <section>
          <Flex justifyContent="center" m={5}>
            <Heading>Your winery</Heading>
          </Flex>
        </section>
      )}
    </WenoLayout>
  );
};

export default Register;
