import type { Meta, StoryObj } from "@storybook/react";
import Typography from "@/components/atoms/typography";

const meta: Meta<typeof Typography> = {
  title: "atoms/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["body-lg", "body-base", "body-sm", "subtitle", "caption"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const BodyLarge: Story = {
  args: {
    variant: "body-lg",
    children: "Texte de grande taille pour les paragraphes importants.",
  },
};

export const BodyBase: Story = {
  args: {
    variant: "body-base",
    children: "Texte de taille standard pour les paragraphes normaux.",
  },
};

export const BodySmall: Story = {
  args: {
    variant: "body-sm",
    children: "Texte de petite taille pour les détails.",
  },
};

export const Subtitle: Story = {
  args: {
    variant: "subtitle",
    children: "Sous-titre important",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
    children: "Légende ou texte secondaire",
  },
};

export const WithCustomClass: Story = {
  args: {
    variant: "body-base",
    className: "text-teal-600 font-bold",
    children: "Texte avec classe personnalisée",
  },
};
