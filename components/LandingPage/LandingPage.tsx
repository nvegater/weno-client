import React, { FC } from "react";
import { NavBarWithSubmenu } from "../NavbarWithSubmenu/NavBarWithSubmenu";
import { Hero } from "../Hero/Hero";
import { AuthWrapper } from "../Authentication/AuthWrapper";
import { Badge } from "@chakra-ui/react";

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = ({}) => {
  return (
    <div>
      <NavBarWithSubmenu />
      <Hero />
      <AuthWrapper>
        <Badge colorScheme="green">Success</Badge>
      </AuthWrapper>
    </div>
  );
};
