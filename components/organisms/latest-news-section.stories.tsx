import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LatestNewsSection from './latest-news-section';
import { News } from '@/features/news/types/news.type';

const meta: Meta<typeof LatestNewsSection> = {
  title: 'organisms/LatestNewsSection',
  component: LatestNewsSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof LatestNewsSection>;

const mockNews: News[] = [
  {
    id: 'news-1',
    title: 'Nouvelle session de cours de LSF',
    slug: 'nouvelle-session-cours-lsf',
    content:
      '<p>AccroSignes lance une nouvelle session de cours de langue des signes française pour la rentrée 2026. Inscriptions ouvertes dès maintenant.</p>',
    imageUrl: 'https://picsum.photos/800/450?random=1',
    publishedAt: new Date('2026-02-20'),
    authorId: 'admin-1',
    createdAt: new Date('2026-02-20'),
    updatedAt: new Date('2026-02-20'),
  },
  {
    id: 'news-2',
    title: 'Rencontre sourds-entendants à Grenoble',
    slug: 'rencontre-sourds-entendants-grenoble',
    content:
      '<p>Plus de 50 participants ont rejoint notre dernière rencontre communautaire. Un beau moment de partage et d&apos;échange.</p>',
    imageUrl: 'https://picsum.photos/800/450?random=2',
    publishedAt: new Date('2026-02-10'),
    authorId: 'admin-1',
    createdAt: new Date('2026-02-10'),
    updatedAt: new Date('2026-02-10'),
  },
  {
    id: 'news-3',
    title: 'Atelier découverte LSF pour les enfants',
    slug: 'atelier-decouverte-lsf-enfants',
    content:
      '<p>Un atelier spécialement conçu pour les enfants de 6 à 12 ans. Découverte ludique de la langue des signes.</p>',
    imageUrl: 'https://picsum.photos/800/450?random=3',
    publishedAt: new Date('2026-02-05'),
    authorId: 'admin-1',
    createdAt: new Date('2026-02-05'),
    updatedAt: new Date('2026-02-05'),
  },
];

export const Default: Story = {
  args: {
    news: mockNews,
  },
};

export const Mobile: Story = {
  args: {
    news: mockNews,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
