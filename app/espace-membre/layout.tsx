import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const EspaceMembreLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default EspaceMembreLayout;
