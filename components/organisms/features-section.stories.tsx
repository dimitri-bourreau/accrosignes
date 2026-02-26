import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FeaturesSection from '@/components/organisms/features-section';

const meta: Meta<typeof FeaturesSection> = {
  title: 'organisms/FeaturesSection',
  component: FeaturesSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof FeaturesSection>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
