import * as React from "react";
import { IoIosGrid, IoIosHelpBuoy } from "react-icons/io";

export interface Link {
  label: string;
  href?: string;
  children?: Array<{
    label: string;
    description?: string;
    href: string;
    icon?: React.ReactElement;
  }>;
}

export const generateLinks = (
  urlAlias: string | null,
  username: string | null,
  userType: "owner" | "visitor"
): Link[] => {
  let allLinks: Link[] = [
    { label: "home", href: "/" },

    {
      label: "aboutUs",
      href: "#",
      children: [
        {
          label: "getHelp",
          description: "readDocumentation",
          href: "#",
          icon: <IoIosHelpBuoy />,
        },

        {
          label: "termsAndConditions",
          description: "readAboutContracts",
          href: "#",
          icon: <IoIosGrid />,
        },
      ],
    },
  ];

  if (userType === "owner" && urlAlias) {
    const profileLink: Link = {
      label: "profile",
      href: `/winery/${urlAlias}`,
    };

    allLinks.push(profileLink);
  }
  if (userType === "visitor" && username) {
    const profileLink: Link = {
      label: "Profile",
      href: `/user/${username}`,
    };
    allLinks.push(profileLink);
  }

  return allLinks;
};
