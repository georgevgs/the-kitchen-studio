import { getPermalink, getAsset } from "./utils/permalinks";

export const headerData = {
  links: [
    {
      text: "Έπιπλα Κουζίνας",
      links: [
        {
          text: "Features",
          href: "#",
        },
        {
          text: "Pricing",
          href: "#",
        },
        {
          text: "Contact",
          href: "#",
        },
        {
          text: "Terms",
          href: getPermalink("/terms"),
        },
        {
          text: "Privacy policy",
          href: getPermalink("/privacy"),
        },
      ],
    },
    {
      text: "Ντουλάπες",
      links: [
        {
          text: "Multi One",
          href: "#",
        },
        {
          text: "Multi Two",
          href: "#",
        },
      ],
    },
    {
      text: "Προϊόντα",
      links: [
        {
          text: "Multi One",
          href: "#",
        },
        {
          text: "Multi Two",
          href: "#",
        },
      ],
    },
    {
      text: "Showroom",
      href: getPermalink("#"),
    },
  ],
  actions: [
    {
      type: "button",
      text: "Επικοινωνία",
      href: "https://github.com/onwidget/astrowind",
    },
  ],
};

export const footerData = {
  links: [
    {
      title: "Product",
      links: [
        { text: "Features", href: "#" },
        { text: "Security", href: "#" },
        { text: "Team", href: "#" },
        { text: "Enterprise", href: "#" },
        { text: "Customer stories", href: "#" },
        { text: "Pricing", href: "#" },
        { text: "Resources", href: "#" },
      ],
    },
    {
      title: "Platform",
      links: [
        { text: "Developer API", href: "#" },
        { text: "Partners", href: "#" },
        { text: "Atom", href: "#" },
        { text: "Electron", href: "#" },
        { text: "AstroWind Desktop", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Docs", href: "#" },
        { text: "Community Forum", href: "#" },
        { text: "Professional Services", href: "#" },
        { text: "Skills", href: "#" },
        { text: "Status", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Press", href: "#" },
        { text: "Inclusion", href: "#" },
        { text: "Social Impact", href: "#" },
        { text: "Shop", href: "#" },
      ],
    },
  ],
  secondaryLinks: [
    { text: "Terms", href: getPermalink("/terms") },
    { text: "Privacy Policy", href: getPermalink("/privacy") },
  ],
  socialLinks: [
    {
      ariaLabel: "Instagram",
      icon: "tabler:brand-instagram",
      href: "https://www.instagram.com/thekitchenstudiogr/",
    },
    {
      ariaLabel: "Facebook",
      icon: "tabler:brand-facebook",
      href: "https://www.facebook.com/kitchenstudio/",
    },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 float-left rounded-sm bg-[url(https://raw.githubusercontent.com/georgevgs/gv-portfolio/main/public/favicon.svg)]"></span>
    Made by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://vagdas.eu/" target="_blank" rel="noopener noreferrer"> VAGDAS</a> · All rights reserved.
  `,
};
