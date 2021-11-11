import React, { FC } from "react";
import { Hero } from "../Hero/Hero";
import { AuthWrapper } from "../Authentication/AuthWrapper";
import { ExperiencesGrid } from "../Experiences/ExperiencesGrid";
import { WenoLayout } from "../GeneralLayout/WenoLayout";

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = ({}) => {
  return (
    <WenoLayout>
      <Hero />
      <AuthWrapper>
        <ExperiencesGrid />
      </AuthWrapper>
    </WenoLayout>
  );
};
