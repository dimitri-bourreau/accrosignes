import type { Meta, StoryObj } from "@storybook/react";
import { ResourceItem } from "./resource-item";
import { Resource } from "@/features/resources/types/resource.type";

const meta: Meta<typeof ResourceItem> = {
  title: "molecules/ResourceItem",
  component: ResourceItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ResourceItem>;

const mockFolder: Resource = {
  id: "folder-1",
  name: "Supports de cours",
  type: "folder",
  parentId: null,
  authorId: "admin-1",
  createdAt: new Date("2026-01-10"),
  updatedAt: new Date("2026-01-10"),
};

const mockFile: Resource = {
  id: "file-1",
  name: "Alphabet LSF - Fiche récapitulative.pdf",
  type: "file",
  parentId: "folder-1",
  fileUrl: "https://example.com/alphabet-lsf.pdf",
  fileType: "application/pdf",
  fileSize: 524288,
  authorId: "admin-1",
  createdAt: new Date("2026-01-12"),
  updatedAt: new Date("2026-01-12"),
};

const mockLink: Resource = {
  id: "link-1",
  name: "Dictionnaire de LSF en ligne",
  type: "link",
  parentId: null,
  linkUrl: "https://example.com/dictionnaire-lsf",
  authorId: "admin-1",
  createdAt: new Date("2026-01-15"),
  updatedAt: new Date("2026-01-15"),
};

export const Folder: Story = {
  args: {
    resource: mockFolder,
    onOpen: () => console.log("Open folder"),
    onDelete: () => console.log("Delete folder"),
  },
};

export const File: Story = {
  args: {
    resource: mockFile,
    onOpen: () => console.log("Open file"),
    onDelete: () => console.log("Delete file"),
  },
};

export const Link: Story = {
  args: {
    resource: mockLink,
    onOpen: () => console.log("Open link"),
    onDelete: () => console.log("Delete link"),
  },
};
