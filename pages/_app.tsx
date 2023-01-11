import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import { SprintProvider } from "../context/SprintContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const roboto = Roboto({
  weight: "400",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <DndProvider backend={HTML5Backend}>
        <SprintProvider>
          <Component {...pageProps} />
        </SprintProvider>
      </DndProvider>
    </div>
  );
}

export default MyApp;
