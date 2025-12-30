import type { Meta, StoryObj } from "@storybook/react";
import { ImageUpload } from "./image-upload";

const meta: Meta<typeof ImageUpload> = {
  title: "molecules/ImageUpload",
  component: ImageUpload,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ImageUpload>;

export const Empty: Story = {
  args: {
    imageUrl: "",
    uploading: false,
    onUpload: (file: File) => console.log("Upload", file.name),
    onRemove: () => console.log("Remove"),
  },
};

export const Uploading: Story = {
  args: {
    imageUrl: "",
    uploading: true,
    onUpload: (file: File) => console.log("Upload", file.name),
    onRemove: () => console.log("Remove"),
  },
};

export const WithImage: Story = {
  args: {
    imageUrl: "https://picsum.photos/400/300",
    uploading: false,
    onUpload: (file: File) => console.log("Upload", file.name),
    onRemove: () => console.log("Remove"),
  },
};
