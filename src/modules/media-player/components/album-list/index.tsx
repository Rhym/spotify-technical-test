import React from "react";

import { Skeleton } from "@/components/skeleton";
import { Typography } from "@/components/typography";

import { MediaPlayerContext } from "../../media-player-machine-context";
import styles from "./album-list.module.css";

export type AlbumListProps = React.ComponentPropsWithoutRef<"div"> & {
  children?: never;
};

export function AlbumList({ ...props }: AlbumListProps): JSX.Element | null {
  const isLoading = MediaPlayerContext.useSelector(
    (s) => s.value.interface === "loadingSelectedTrack",
  );

  const album = MediaPlayerContext.useSelector(
    (s) => s.context.selectedTrackAlbum,
  );

  // Render
  //-----------------------------------------------------

  if (isLoading) {
    return (
      <div {...props} className={styles.root}>
        <ul className={styles.list}>
          {[...Array(4)].map((_, index) => (
            <li key={index} className={styles.itemSkeleton}>
              <div key={index} className={styles.itemSkeletonInner}>
                <Skeleton height={4} />
                <Skeleton height={4} width={60} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (album == null) {
    return null;
  }

  return (
    <div {...props} className={styles.root}>
      <ul className={styles.list}>
        {album.tracks.items.map((t) => (
          <li key={t.id} className={styles.item}>
            <Typography>{t.name}</Typography>
            <Typography color="weak" level="sm">
              {t.artists.map((a) => a.name).join(", ")}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}
