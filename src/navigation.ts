import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Products',
      href: getPermalink('/products'),
    },
    {
      text: 'Technology',
      href: getPermalink('/technology'),
    },
    {
      text: 'Production Sites',
      href: getPermalink('/production-sites'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [{ text: 'Get Quote', href: getPermalink('/contact'), target: '_self' }],
};

export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'Sheet Metal Processing', href: getPermalink('/products') },
        { text: 'Precision Cutting', href: getPermalink('/technology') },
        { text: 'Custom Manufacturing', href: getPermalink('/products') },
        { text: 'Quality Assurance', href: getPermalink('/technology') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About Aries Group', href: getPermalink('/about') },
        { text: 'Production Sites', href: getPermalink('/production-sites') },
        { text: 'Technology', href: getPermalink('/technology') },
        { text: 'Contact Us', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'Industries',
      links: [
        { text: 'Automotive', href: getPermalink('/products') },
        { text: 'Aerospace', href: getPermalink('/products') },
        { text: 'Industrial Equipment', href: getPermalink('/products') },
        { text: 'Construction', href: getPermalink('/products') },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Get Quote', href: getPermalink('/contact') },
        { text: 'Technical Support', href: getPermalink('/contact') },
        { text: 'Quality Standards', href: getPermalink('/technology') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:contact@aries1.fr' },
  ],
  footNote: `
    © ${new Date().getFullYear()} Aries Group. All rights reserved. European leader in sheet metal processing.
  `,
};
