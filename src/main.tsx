import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { MediaPlayerProvider } from "@/modules/media-player/media-player-machine-context";

import { MediaPlayer } from "./modules/media-player";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MediaPlayerProvider>
      <MediaPlayer />
    </MediaPlayerProvider>
  </React.StrictMode>,
);
