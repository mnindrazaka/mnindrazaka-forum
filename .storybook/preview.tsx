import React from "react";
import type { Preview } from "@storybook/react";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";
import { useDarkMode } from "storybook-dark-mode";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

const preview: Preview = {
  decorators: [
    (Story) => {
      const theme = useDarkMode() ? "dark" : "light";
      return (
        <TamaguiProvider defaultTheme={theme} config={config}>
          <Story />
        </TamaguiProvider>
      );
    },
  ],
};

export default preview;
