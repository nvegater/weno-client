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
  console.log(userType, urlAlias);
  let allLinks: Link[] = [
    { label: "Home", href: "/" },

    {
      label: "About us",
      href: "#",
      children: [
        {
          label: "Get Help",
          description: "Read our documentation and FAQs, or get in touch.",
          href: "#",
          icon: <IoIosHelpBuoy />,
        },

        {
          label: "Terms and conditions",
          description:
            "Read more about the contracts between clients/service providers and Weno",
          href: "#",
          icon: <IoIosGrid />,
        },
      ],
    },
  ];

  if (userType === "owner" && urlAlias) {
    const profileLink: Link = {
      label: "Profile",
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
