import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agenda',
  description:
    'Consultez le calendrier des cours de LSF, événements et rencontres organisés par AccroSignes à Grenoble.',
  alternates: {
    canonical: '/agenda',
  },
  openGraph: {
    title: 'Agenda | AccroSignes',
    description:
      'Calendrier des cours de Langue des Signes Française et événements AccroSignes à Grenoble.',
  },
};

const AgendaLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AgendaLayout;
