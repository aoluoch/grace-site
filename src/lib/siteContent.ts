import { useEffect, useState } from "react";
import { getSiteContent } from "./api";

/**
 * Typed registry of the admin-managed, non-Contentful content blocks and their
 * built-in defaults. Components render the defaults immediately (so there is no
 * flash / empty state) and transparently override them with the published
 * Appwrite values when available.
 */

export const SITE_KEYS = {
  values: "core_values",
  giving: "giving_details",
  contact: "contact_info",
} as const;

/* ------------------------- Core values ---------------------------- */

export interface CoreValuesContent {
  heading: string;
  intro: string;
  values: string[];
}

export const DEFAULT_CORE_VALUES: CoreValuesContent = {
  heading: "Our Core Values",
  intro:
    "At Grace Arena Ministries, we are one big family — connected by",
  values: ["Love", "Word", "Prayer", "Service", "Excellence", "Discipleship"],
};

/* ------------------------- Giving details ------------------------- */

export interface GivingEntry {
  label: string;
  value: string;
}

export interface GivingBlock {
  region: string;
  entries: GivingEntry[];
}

export interface GivingContent {
  title: string;
  blocks: GivingBlock[];
  sideEntries: GivingEntry[];
}

export const DEFAULT_GIVING: GivingContent = {
  title: "DOM PAYMENT DETAILS",
  blocks: [
    {
      region: "USA",
      entries: [
        { label: "CASHPAPP", value: "$GRACEHOUR1" },
        { label: "ZELLE", value: "4697567320" },
        { label: "ACC. NAME", value: "DOM INTERNATIONAL USA" },
      ],
    },
    {
      region: "UK",
      entries: [
        { label: "ACC. NO", value: "10460241" },
        { label: "SC", value: "60-02-63" },
        { label: "NAME", value: "DAVID OWUSU MINISTRIES" },
      ],
    },
  ],
  sideEntries: [
    { label: "PAYBILL (KENYA)", value: "919143" },
    { label: "ACC. NAME", value: "SEED / TITHE" },
    { label: "PAYBILL (KENYA)", value: "7194870" },
    { label: "ACC. NAME", value: "SEED / TITHE" },
    { label: "WAVE / WORLD REMIT / MPESA", value: "+254 799 403 242" },
    { label: "ZAMBIA MOMO", value: "0975 904 802" },
    { label: "MOMO (GHANA)", value: "0550 738 873" },
    { label: "PAYPAL", value: "david.kowusu@gmail.com" },
  ],
};

/* ------------------------- Contact & social ----------------------- */

export interface SocialLink {
  name: string;
  href: string;
}

export interface ContactContent {
  phone: string;
  email: string;
  address: string;
  website: string;
  socials: SocialLink[];
}

export const DEFAULT_CONTACT: ContactContent = {
  phone: "0759 212574",
  email: "gracearenakenya@gmail.com",
  address: "Bungoma Road, off Baricho Road, Nairobi, Kenya",
  website: "gracearenaministries.org",
  socials: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100088590864652",
    },
    { name: "YouTube", href: "https://www.youtube.com/@prophetdavidowusu4328" },
    { name: "Instagram", href: "https://www.instagram.com/prophdavidowusu/" },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/discover/prophet-david-owusu?lang=en",
    },
  ],
};

/**
 * Returns `fallback` immediately, then replaces it with the published Appwrite
 * value for `key` once it loads. Never throws — on any error the fallback is
 * kept, so the public site is always safe.
 */
export function useSiteContent<T>(key: string, fallback: T): T {
  const [content, setContent] = useState<T>(fallback);

  useEffect(() => {
    let active = true;
    getSiteContent<T>(key)
      .then((data) => {
        if (active && data) setContent(data);
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => {
      active = false;
    };
  }, [key]);

  return content;
}
