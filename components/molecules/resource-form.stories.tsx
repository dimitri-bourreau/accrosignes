import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ResourceForm } from './resource-form';

const queryClient = new QueryClient();

const meta: Meta<typeof ResourceForm> = {
  title: 'molecules/ResourceForm',
  component: ResourceForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ResourceForm>;

export const RootLevel: Story = {
  args: {
    userId: 'admin-123',
    parentId: null,
    onClose: () => console.log('Form closed'),
  },
};

export const InFolder: Story = {
  args: {
    userId: 'admin-123',
    parentId: 'folder-123',
    onClose: () => console.log('Form closed'),
  },
};
