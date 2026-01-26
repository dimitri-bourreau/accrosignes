export interface ContentBlock {
  key: string;
  value: string;
  label: string;
  updatedAt: Date;
  updatedBy: string;
}

export interface ContentSection {
  title: string;
  keys: ContentKey[];
}

export const CONTENT_KEYS = {
  "home.title": "Titre principal",
  "home.subtitle": "Sous-titre",
  "home.description": "Description",
  "home.features.title": "Titre de la section",
  "home.feature1.emoji": "Bloc 1 - Emoji",
  "home.feature1.title": "Bloc 1 - Titre",
  "home.feature1.text": "Bloc 1 - Description",
  "home.feature2.emoji": "Bloc 2 - Emoji",
  "home.feature2.title": "Bloc 2 - Titre",
  "home.feature2.text": "Bloc 2 - Description",
  "home.feature3.emoji": "Bloc 3 - Emoji",
  "home.feature3.title": "Bloc 3 - Titre",
  "home.feature3.text": "Bloc 3 - Description",
  legal: "Contenu complet",
  privacy: "Contenu complet",
} as const;

export type ContentKey = keyof typeof CONTENT_KEYS;

export const CONTENT_SECTIONS: ContentSection[] = [
  {
    title: "Page d'accueil - Introduction",
    keys: ["home.title", "home.subtitle", "home.description"],
  },
  {
    title: "Page d'accueil - Ce que nous proposons",
    keys: [
      "home.features.title",
      "home.feature1.emoji",
      "home.feature1.title",
      "home.feature1.text",
      "home.feature2.emoji",
      "home.feature2.title",
      "home.feature2.text",
      "home.feature3.emoji",
      "home.feature3.title",
      "home.feature3.text",
    ],
  },
  {
    title: "Mentions légales",
    keys: ["legal"],
  },
  {
    title: "Politique de confidentialité",
    keys: ["privacy"],
  },
];

export const RICH_TEXT_KEYS: ContentKey[] = ["legal", "privacy"];

export const isRichTextKey = (key: ContentKey): boolean =>
  RICH_TEXT_KEYS.includes(key);
