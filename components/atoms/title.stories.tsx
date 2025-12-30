import type { Meta, StoryObj } from "@storybook/react";
import Title from "@/components/atoms/title";

const meta: Meta<typeof Title> = {
  title: "atoms/Title",
  component: Title,
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: ["h1", "h2", "h3", "h4"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const H1: Story = {
  args: {
    level: "h1",
    children: "Titre de niveau 1",
  },
};

export const H2: Story = {
  args: {
    level: "h2",
    children: "Titre de niveau 2",
  },
};

export const H3: Story = {
  args: {
    level: "h3",
    children: "Titre de niveau 3",
  },
};

export const H4: Story = {
  args: {
    level: "h4",
    children: "Titre de niveau 4",
  },
};

export const WithCustomClass: Story = {
  args: {
    level: "h2",
    className: "text-teal-600",
    children: "Titre personnalisé",
  },
};
