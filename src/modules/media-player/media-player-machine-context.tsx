import { createActorContext } from "@xstate/react";
import { type ReactNode } from "react";

import { mediaPlayerMachine } from "./media-player-machine";

export const MediaPlayerContext = createActorContext(mediaPlayerMachine, {});

export function MediaPlayerProvider({ children }: { children: ReactNode }) {
  return <MediaPlayerContext.Provider>{children}</MediaPlayerContext.Provider>;
}
