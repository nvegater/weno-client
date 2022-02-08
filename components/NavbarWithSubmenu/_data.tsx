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
  userType: "owner" | "visitor"
): Link[] => {
  let allLinks: Link[] = [
    { label: "home", href: "/" },

    {
      label: "aboutUs",
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

  if (urlAlias) {
    const profileRef =
      userType === "owner" ? `/winery/${urlAlias}` : `/account/${urlAlias}`;

    const profileLink: Link = {
      label: "Profile",
      href: profileRef,
    };

    allLinks.push(profileLink);
  }

  return allLinks;
};
