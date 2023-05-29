import type { StorybookConfig } from "@storybook/nextjs";
import { shouldExclude } from "tamagui-loader";
import webpack from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const projectRoot = __dirname;

const tamaguiOptions = {
  config: "./tamagui.config.ts",
  components: ["tamagui"],
  useReactNativeWebLite: true,
  /*
  This is to prevent the next.js error caused by importing css outside app
  TODO: change this to true in development mode only later
  */
  disableExtraction: true,
  outputCSS:
    process.env.NODE_ENV === "production" ? "./public/tamagui.css" : null,
  importsWhitelist: ["constants.js", "colors.js"],
  logTimings: true,
};

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
    "@storybook/addon-coverage",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config, { configType }) => {
    // add your own webpack tweaks if needed
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "react-native$": require.resolve("react-native-web"),
        // Experimentally opt into react-native-web-lite which drops support for all react-native
        // built-in List components, and removes many deprecated APIs and code-reduction, slimming
        // bundle sizes down nearly 30-50Kb.
        // 'react-native$': 'react-native-web-lite',
        "react-native-web$": "react-native-web-lite",

        // optional, for lighter svg icons on web
        "react-native-svg": require.resolve("@tamagui/react-native-svg"),
      },
    };

    config.module?.rules?.push({
      test: /\.[jt]sx?$/,
      // you'll likely want to adjust this helper function,
      // but it serves as a decent start that you can copy/paste from
      exclude: (path) => shouldExclude(path, projectRoot),
      use: [
        // optionally thread-loader for significantly faster compile!
        "thread-loader",

        // works nicely alongside esbuild
        {
          loader: "esbuild-loader",
          options: {
            loader: "tsx",
          },
        },

        {
          loader: "tamagui-loader",
          options: tamaguiOptions,
        },
      ],
    });

    config.plugins?.push(
      new webpack.DefinePlugin({
        "process.env.TAMAGUI_TARGET": '"web"',
      })
    );

    config.resolve.plugins = [new TsconfigPathsPlugin()];

    return config;
  },
};
export default config;
