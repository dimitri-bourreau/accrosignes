import type { Meta, StoryObj } from "@storybook/react";
import SupportSection from "./support-section";

const meta: Meta<typeof SupportSection> = {
  title: "Components/SupportSection",
  component: SupportSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SupportSection>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
