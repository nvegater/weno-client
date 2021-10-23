import React, { FC } from "react";
import { NavBarWithSubmenu } from "../NavbarWithSubmenu/NavBarWithSubmenu";
import { Hero } from "../Hero/Hero";

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = ({}) => {
  return (
    <div>
      <NavBarWithSubmenu />
      <Hero />
    </div>
  );
};
