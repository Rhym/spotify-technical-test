import { Track } from "@spotify/web-api-ts-sdk";
import React, { useCallback, useMemo } from "react";

import { BREAKPOINT_LARGE } from "@/constants";
import { EqualizerBars } from "@/components/equalizer-bars";
import { millisecondsToTimeString } from "@/utils/milliseconds-to-time-string";

import { MediaPlayerContext } from "../../media-player-machine-context";
import styles from "./track-summary.module.css";

export type TrackSummaryProps = React.ComponentPropsWithoutRef<"button"> & {
  children?: never;

  /**
   * The position of the track
   */
  index: number;

  /**
   * The track data
   */
  track: Track;
};

export function TrackSummary({
  index,
  track,
  ...props
}: TrackSummaryProps): JSX.Element {
  const { id, album, artists, name, duration_ms, preview_url } = track;

  const mediaPlayerActorRef = MediaPlayerContext.useActorRef();
  const { send } = mediaPlayerActorRef;

  const selectedTrack = MediaPlayerContext.useSelector(
    (s) => s.context.selectedTrack,
  );

  const mediaIsPlaying = MediaPlayerContext.useSelector(
    (s) => s.context.isPlaying,
  );

  const playingTrackId = MediaPlayerContext.useSelector(
    (s) => s.context.playingTrackId,
  );

  const imageSrc = useMemo(() => {
    return album.images[0].url;
  }, [album.images]);

  // Handlers
  //-----------------------------------------------------

  const handleSelectTrack = useCallback(() => {
    /**
     * If the user is in a smaller device, play the
     * song preview when they select it.
     */
    if (
      typeof window !== "undefined" &&
      window != null &&
      window.innerWidth <= BREAKPOINT_LARGE
    ) {
      send({ type: "SELECT_TRACK_AND_PLAY", selectedTrack: track });

      return;
    }

    send({ type: "SELECT_TRACK", selectedTrack: track });
  }, [send, track]);

  // Render
  //-----------------------------------------------------

  const isActive = selectedTrack?.id === id;
  const isPlaying = mediaIsPlaying && playingTrackId === id;

  const renderAffix = useMemo(() => {
    if (isPlaying) {
      return (
        <span className={styles.equalizer}>
          <EqualizerBars />
        </span>
      );
    }

    return <span className={styles.index}>{index}</span>;
  }, [index, isPlaying]);

  return (
    <button
      {...props}
      onClick={handleSelectTrack}
      className={`${styles.root} ${isActive ? styles["root--is-active"] : ""} ${
        isPlaying ? styles["root--is-playing"] : ""
      }`}
      type="button"
      disabled={preview_url == null}
    >
      {renderAffix}
      <img src={imageSrc} className={styles.thumbnail} alt={name} />
      <span className={styles.content}>
        <span className={styles.title}>{name}</span>
        <span className={styles.subtitle}>
          {`${album.name} · ${artists.map((a) => a.name).join(", ")}`}
        </span>
      </span>
      <span className={styles.time}>
        {millisecondsToTimeString(duration_ms)}
      </span>
    </button>
  );
}
