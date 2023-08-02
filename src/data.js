import { getPermalink, getAsset } from "./utils/permalinks";

export const headerData = {
  links: [
    {
      text: "Έπιπλα Κουζίνας",
      links: [
        {
          text: "Submenu 1",
          links: [
            {
              text: "Nested Link 1",
              href: "#",
            },
            {
              text: "Nested Link 2",
              href: "#",
            },
          ],
        },
        {
          text: "Submenu 2",
          links: [
            {
              text: "Nested Link 3",
              href: "#",
            },
            {
              text: "Nested Link 4",
              href: "#",
            },
          ],
        },
        {
          text: "Submenu 3",
          links: [
            {
              text: "Nested Link 5",
              href: "#",
            },
            {
              text: "Nested Link 6",
              href: "#",
            },
          ],
        },
        {
          text: "Submenu 4",
          links: [
            {
              text: "Nested Link 7",
              href: "#",
            },
            {
              text: "Nested Link 8",
              href: "#",
            },
          ],
        },
        {
          text: "Submenu 5",
          links: [
            {
              text: "Nested Link 9",
              href: "#",
            },
            {
              text: "Nested Link 10",
              href: "#",
            },
          ],
        },
        {
          text: "Submenu 6",
          href: "#",
        },
      ],
    },
    {
      text: "Προϊόντα",
      links: [
        {
          text: "Bath",
          links: [
            {
              text: "Corian Bath",
              href: "/bath-corian",
            },
            {
              text: "Είδη Υγιεινής",
              href: "#",
            },
          ],
        },
        {
          text: "Πλακάκια",
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
      href: "/contact",
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
    Made by <a class="text-orange-500 hover:underline dark:text-gray-200" href="https://vagdas.eu/" target="_blank" rel="noopener noreferrer"> VAGDAS</a> · All rights reserved.
  `,
};
