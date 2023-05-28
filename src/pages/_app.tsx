import "@tamagui/core/reset.css";

import { NextThemeProvider, useRootTheme } from "@tamagui/next-theme";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { useMemo } from "react";
import { TamaguiProvider } from "tamagui";
import NextNProgress from "nextjs-progressbar";

import config from "../../tamagui.config";
import Script from "next/script";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import * as fakers from "@/fakers";

dayjs.extend(relativeTime);

if (process.env.NODE_ENV === "production") {
  require("../../public/tamagui.css");
}

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useRootTheme();

  const contents = useMemo(() => {
    return <Component {...pageProps} />;
  }, [Component, pageProps]);

  React.useEffect(() => {
    fakers.generateSeeds();
    console.log(fakers.posts);
  }, []);

  return (
    <>
      <Head>
        <title>Karirlab Forum</title>
      </Head>
      <Script
        id="tamagui-animations-mount"
        dangerouslySetInnerHTML={{
          __html: "document.documentElement.classList.add('t_unmounted')",
        }}
      />
      <NextNProgress />
      <NextThemeProvider
        onChangeTheme={(name) => setTheme(name as "dark" | "light")}
      >
        <TamaguiProvider
          config={config}
          disableInjectCSS
          disableRootThemeClass
          defaultTheme={theme}
        >
          {contents}
        </TamaguiProvider>
      </NextThemeProvider>
    </>
  );
}
