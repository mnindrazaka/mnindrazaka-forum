process.env.TAMAGUI_TARGET = "web";

const { withTamagui } = require("@tamagui/next-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = function (name, { defaultConfig }) {
  let config = {
    ...defaultConfig,
    ...nextConfig,
  };

  const tamaguiPlugin = withTamagui({
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
  });

  return {
    ...config,
    ...tamaguiPlugin(config),
  };
};
