import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'error' - fail CI on a11y violations
      // 'todo' - show a11y violations in the test UI only
      // 'off' - skip a11y checks entirely
      test: "error",
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: true,
          },
          {
            id: "button-name",
            enabled: true,
          },
          {
            id: "aria-allowed-attr",
            enabled: true,
          },
        ],
      },
    },
  },
};

export default preview;
