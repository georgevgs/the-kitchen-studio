import { getPermalink } from "./utils/permalinks";

export const headerData = {
  links: [
    {
      text: "Έπιπλα Κουζίνας",
      links: [
        {
          text: "Modern Kitchens",
          href: getPermalink("/kitchens/modern-kitchens"),
        },
        {
          text: "Classic Kitchens",
          href: getPermalink("/kitchens/classic-kitchens"),
        },
        {
          text: "Corian Kitchens",
          href: getPermalink("/kitchens/corian-kitchens"),
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
              text: "Έπιπλα Μπάνιου",
              href: getPermalink("/bath/bath-furnitures"),
            },
            {
              text: "Corian Bath",
              href: getPermalink("/bath/corian-bath"),
            },
            {
              text: "ikaradimas.gr",
              href: "https://ikaradimas.gr",
              newtab: true,
            },
          ],
        },
        {
          text: "Πλακάκια",
          href: getPermalink("/tiles"),
        },
        {
          text: "Ντουλάπες",
          href: getPermalink("/wardrobes"),
        },
        {
          text: "Living",
          href: getPermalink("/living"),
        },
        {
          text: "Πόρτες",
          href: getPermalink("/doors"),
        },
      ],
    },
    {
      text: "Έργα",
      href: getPermalink("/erga"),
    },
    {
      text: "Μελέτες",
      href: getPermalink("/meletes"),
    },
    {
      text: "Showroom",
      href: getPermalink("/showroom"),
    },
  ],
  actions: [
    {
      type: "button",
      text: "Επικοινωνία",
      href: getPermalink("/contact"),
    },
  ],
};

export const footerData = {
  links: [
    {
      title: "Έπιπλα Κουζίνας",
      links: [
        {
          text: "Modern Kitchens",
          href: getPermalink("/kitchens/modern-kitchens"),
        },
        {
          text: "Classic Kitchens",
          href: getPermalink("/kitchens/classic-kitchens"),
        },
        {
          text: "Corian Kitchens",
          href: getPermalink("/kitchens/corian-kitchens"),
        },
      ],
    },
    {
      title: "Προϊόντα",
      links: [
        { text: "Bath", href: getPermalink("/bath") },
        { text: "Πλακάκια", href: getPermalink("/tiles") },
        { text: "Ντουλάπες", href: getPermalink("/wardrobes") },
        { text: "Living", href: getPermalink("/living") },
        { text: "Πόρτες", href: getPermalink("/doors") },
      ],
    },
    {
      title: "The Kitchen Studio",
      links: [
        { text: "About us", href: getPermalink("/about-us") },
        { text: "Showroom", href: getPermalink("/showroom") },
        { text: "Έργα", href: getPermalink("/erga") },
        { text: "Μελέτες", href: getPermalink("/meletes") },
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
      icon: "fa-brands fa-instagram",
      href: "https://www.instagram.com/thekitchenstudiogr/",
    },
    {
      ariaLabel: "Facebook",
      icon: "fa-brands fa-facebook",
      href: "https://www.facebook.com/kitchenstudio/",
    },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 float-left rounded-sm bg-[url(https://raw.githubusercontent.com/georgevgs/gv-portfolio/main/public/favicon.svg)]"></span>
    Made by <a class="text-orange-800 hover:underline dark:text-gray-200 font-bold" href="https://vagdas.eu/" target="_blank" rel="noopener noreferrer"> VAGDAS</a> · All rights reserved.
  `,
};
