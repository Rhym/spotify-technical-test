import React, { useCallback, useMemo } from "react";

import { Heading } from "@/components/heading";
import { Icon } from "@/components/icon";
import { IconButton } from "@/components/icon-button";
import { Typography } from "@/components/typography";

import { MediaPlayerContext } from "../../media-player-machine-context";
import { AlbumList } from "../album-list";
import styles from "./track-information.module.css";

export type TrackInformationProps = React.ComponentPropsWithoutRef<"div">;

export function TrackInformation({
  ...props
}: TrackInformationProps): JSX.Element | null {
  const mediaPlayerActorRef = MediaPlayerContext.useActorRef();
  const { send } = mediaPlayerActorRef;

  const selectedTrack = MediaPlayerContext.useSelector(
    (s) => s.context.selectedTrack,
  );

  const playingTrackId = MediaPlayerContext.useSelector(
    (s) => s.context.playingTrackId,
  );

  const mediaIsPlaying = MediaPlayerContext.useSelector(
    (s) => s.context.isPlaying,
  );

  const imageSrc = useMemo(() => {
    return selectedTrack?.album.images[0].url;
  }, [selectedTrack?.album.images]);

  const isPlaying = mediaIsPlaying && playingTrackId === selectedTrack?.id;

  // Handlers
  //-----------------------------------------------------

  const handleTogglePlay = useCallback(() => {
    if (mediaIsPlaying && playingTrackId === selectedTrack?.id) {
      send({ type: "PAUSE" });
      return;
    }

    if (mediaIsPlaying) {
      send({ type: "PAUSE" });
      send({ type: "PLAY" });
      return;
    }

    send({ type: "PLAY" });
  }, [mediaIsPlaying, playingTrackId, selectedTrack?.id, send]);

  // Render
  //-----------------------------------------------------

  if (selectedTrack == null) {
    return null;
  }

  return (
    <div {...props} className={styles.root}>
      <div className={styles.header}>
        <img
          src={imageSrc}
          className={styles.thumbnail}
          alt={selectedTrack.name}
        />
        <div className={styles.meta}>
          <Typography>Track</Typography>
          <Heading>{selectedTrack.name}</Heading>
          <Typography>
            {selectedTrack.artists.map((a) => a.name).join(", ")}
          </Typography>
        </div>
      </div>

      {/* Media player */}
      <div className={styles.controls}>
        <IconButton
          onClick={handleTogglePlay}
          icon={isPlaying ? <Icon.Pause /> : <Icon.Play />}
        />
      </div>

      {/* Album list */}
      <div className={styles.list}>
        <AlbumList />
      </div>
    </div>
  );
}
