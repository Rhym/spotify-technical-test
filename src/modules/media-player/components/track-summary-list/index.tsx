import React from "react";

import { Alert } from "@/components/alert";
import { Skeleton } from "@/components/skeleton";

import { MediaPlayerContext } from "../../media-player-machine-context";
import { TrackSummary } from "../track-summary";
import styles from "./track-summary-list.module.css";

export type TrackSummaryListProps = React.ComponentPropsWithoutRef<"div"> & {
  children?: never;
};

export function TrackSummaryList({
  ...props
}: TrackSummaryListProps): JSX.Element {
  const tracks = MediaPlayerContext.useSelector((s) => s.context.searchResults);
  const isLoading = MediaPlayerContext.useSelector(
    (s) => s.value.interface === "searching",
  );

  // Render
  //-----------------------------------------------------

  if (isLoading) {
    return (
      <div {...props}>
        <ul className={styles.root}>
          {[...Array(4)].map((_, index) => (
            <li key={index} className={styles.itemSkeleton}>
              <Skeleton height={8} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /**
   * This should most likely be handled by an empty state in XState
   *
   * @TODO Discuss with Chris
   */
  if (tracks != null && tracks.length === 0) {
    return (
      <div {...props}>
        <Alert>Sorry, there were no results with that search term</Alert>
      </div>
    );
  }

  return (
    <div {...props}>
      <ul className={styles.root}>
        {tracks?.map((track, index) => (
          <li key={track.id} className={styles.item}>
            <TrackSummary index={index + 1} track={track} />
          </li>
        ))}
      </ul>
    </div>
  );
}
