export const sections = [
  { label: "Features", href: "/features/" },
  { label: "Business types", href: "/business/" },
  { label: "Tools", href: "/tools/" },
  { label: "Guides", href: "/guides/" },
] as const;

export const legal = [
  { label: "About BolCash", href: "/about/" },
  { label: "Contact and grievance", href: "/contact/" },
  { label: "Privacy policy", href: "/privacy/" },
  { label: "Terms of use", href: "/terms/" },
] as const;

// The 2 language hubs. Confirm the second language before launch.
export const languages = [
  { code: "en", label: "English", href: "/" },
  { code: "hi", label: "हिन्दी", href: "/hi/" },
] as const;
