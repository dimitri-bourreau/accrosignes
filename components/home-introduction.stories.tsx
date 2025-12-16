import type { Meta, StoryObj } from "@storybook/react";
import HomeIntroduction from "./home-introduction";

const meta: Meta<typeof HomeIntroduction> = {
  title: "Components/HomeIntroduction",
  component: HomeIntroduction,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof HomeIntroduction>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};
