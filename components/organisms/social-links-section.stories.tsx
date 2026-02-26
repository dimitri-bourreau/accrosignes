import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SocialLinksSection from './social-links-section';

const meta: Meta<typeof SocialLinksSection> = {
  title: 'organisms/SocialLinksSection',
  component: SocialLinksSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SocialLinksSection>;

export const Default: Story = {};

export const Embedded: Story = {
  args: {
    embedded: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
