type RequiredContentfulKey =
  | 'VITE_CONTENTFUL_SPACE_ID'
  | 'VITE_CONTENTFUL_CDA_TOKEN';

export type ContentfulEnv = {
  spaceId: string;
  accessToken: string;
  host: string;
};

const readRequiredEnv = (key: RequiredContentfulKey): string => {
  const value = import.meta.env[key]?.trim();

  if (!value) {
    throw new Error(`[Contentful] Missing required env var: ${key}`);
  }

  return value;
};

export const getContentfulEnv = (): ContentfulEnv => {
  const host =
    import.meta.env.VITE_CONTENTFUL_CDN_URL?.trim().replace(/^https?:\/\//, '') ||
    'cdn.contentful.com';

  return {
    spaceId: readRequiredEnv('VITE_CONTENTFUL_SPACE_ID'),
    accessToken: readRequiredEnv('VITE_CONTENTFUL_CDA_TOKEN'),
    host,
  };
};