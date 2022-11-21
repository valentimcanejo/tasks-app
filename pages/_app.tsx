import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import { SprintProvider } from "../context/SprintContext";

const roboto = Roboto({
  weight: "400",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <SprintProvider>
        <Component {...pageProps} />
      </SprintProvider>
    </div>
  );
}

export default MyApp;
