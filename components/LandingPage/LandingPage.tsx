import React, { FC } from "react";
import { NavBarWithSubmenu } from "../NavbarWithSubmenu/NavBarWithSubmenu";
import { Hero } from "../Hero/Hero";
import { AuthWrapper } from "../Authentication/AuthWrapper";
import { ExperiencesGrid } from "../Experiences/ExperiencesGrid";

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = ({}) => {
  return (
    <div>
      <NavBarWithSubmenu />
      <Hero />
      <AuthWrapper>
        <ExperiencesGrid />
      </AuthWrapper>
    </div>
  );
};
