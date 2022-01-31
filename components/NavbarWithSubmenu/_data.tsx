import * as React from "react";

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

export const links: Link[] = [
  { label: "home", href: "#" },
  {
    label: "experiences",
    href: "#",
    /*    children: [
      {
        label: "Get Help",
        description: "Read our documentation and FAQs, or get in touch.",
        href: "#",
        icon: <IoHelpBuoy />,
      },

      {
        label: "Extensions",
        description: "Do even more with Assistants, plugins and integrations.",
        href: "#",
        icon: <IoGrid />,
      },
      {
        label: "Blog",
        description: "Get updates, articles and insights from the team.",
        href: "#",
        icon: <MdWeb />,
      },
    ],*/
  },
  {
    label: "wineries",
    /*    children: [
      {
        label: "Get Help",
        description: "Read our documentation and FAQs, or get in touch.",
        href: "#",
        icon: <IoHelpBuoy />,
      },

      {
        label: "Extensions",
        description: "Do even more with Assistants, plugins and integrations.",
        href: "#",
        icon: <IoGrid />,
      },
      {
        label: "Blog",
        description: "Get updates, articles and insights from the team.",
        href: "#",
        icon: <MdWeb />,
      },
    ],*/
  },
  { label: "aboutUs", href: "#" },
];
